const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

const endpoint = `https://${domain}/api/2025-01/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Shopify API error");
  }

  return json.data;
}

// ─── Product ophalen ───────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        selectedOptions: { name: string; value: string }[];
      };
    }[];
  };
  images: {
    edges: {
      node: { url: string; altText: string | null; width: number; height: number };
    }[];
  };
}

const GET_PRODUCT_BY_HANDLE = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<{ productByHandle: ShopifyProduct }>(
      GET_PRODUCT_BY_HANDLE,
      { handle }
    );
    return data.productByHandle;
  } catch {
    return null;
  }
}

// ─── Producten lijst ophalen ───────────────────────────────

const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export interface ShopifyProductSummary {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: {
      node: { url: string; altText: string | null; width: number; height: number };
    }[];
  };
}

export async function getProducts(first = 24): Promise<ShopifyProductSummary[]> {
  try {
    const data = await shopifyFetch<{
      products: { edges: { node: ShopifyProductSummary }[] };
    }>(GET_PRODUCTS, { first });
    return data.products.edges.map((edge) => edge.node);
  } catch {
    return [];
  }
}

// ─── Helper: bouw maat → variantId map ─────────────────────

export function buildSizeVariantMap(product: ShopifyProduct): Record<string, string> {
  const map: Record<string, string> = {};
  for (const edge of product.variants.edges) {
    const sizeOption = edge.node.selectedOptions.find(
      (o) => o.name.toLowerCase() === "maat" || o.name.toLowerCase() === "size"
    );
    if (sizeOption && edge.node.availableForSale) {
      map[sizeOption.value.toUpperCase()] = edge.node.id;
    }
  }
  return map;
}

// ─── Winkelwagen ───────────────────────────────────────────

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string };
          price: { amount: string; currencyCode: string };
          image?: { url: string; altText: string | null };
        };
      };
    }[];
  };
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product { title }
              price { amount currencyCode }
              image { url altText }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFields }
    }
  }
  ${CART_FRAGMENT}
`;

const ADD_TO_CART = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
    }
  }
  ${CART_FRAGMENT}
`;

export async function createCart(variantId: string, quantity = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    CREATE_CART,
    {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    }
  );
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    ADD_TO_CART,
    {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    }
  );
  return data.cartLinesAdd.cart;
}

const UPDATE_CART = `
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
    }
  }
  ${CART_FRAGMENT}
`;

const REMOVE_FROM_CART = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
    }
  }
  ${CART_FRAGMENT}
`;

export async function updateCartItem(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    UPDATE_CART,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    REMOVE_FROM_CART,
    { cartId, lineIds: [lineId] }
  );
  return data.cartLinesRemove.cart;
}
