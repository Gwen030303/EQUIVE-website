import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Shopify Storefront helpers                                        */
/* ------------------------------------------------------------------ */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

const endpoint = `https://${domain}/api/2025-01/graphql.json`;

interface ShopifyCustomerUserError {
  field: string[];
  message: string;
}

interface ShopifyCustomerCreateResult {
  data?: {
    customerCreate?: {
      customer?: { id: string; email: string };
      customerUserErrors?: ShopifyCustomerUserError[];
    };
  };
  errors?: { message: string }[];
}

async function shopifyStorefront(
  query: string,
  variables?: Record<string, unknown>,
): Promise<ShopifyCustomerCreateResult> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API responded with status ${res.status}`);
  }

  return res.json() as Promise<ShopifyCustomerCreateResult>;
}

const CREATE_CUSTOMER = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Allowed subscribe types                                           */
/* ------------------------------------------------------------------ */

const VALID_TYPES = ["newsletter", "waitlist", "collection-drop"] as const;
type SubscribeType = (typeof VALID_TYPES)[number];

/* ------------------------------------------------------------------ */
/*  POST handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, type } = body as {
      email?: string;
      name?: string;
      size?: string;
      source?: string;
      type?: string;
    };

    /* ---------- Validation ---------- */

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email en type zijn verplicht." },
        { status: 400 },
      );
    }

    if (!VALID_TYPES.includes(type as SubscribeType)) {
      return NextResponse.json(
        { error: "Ongeldig aanmeldtype." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres." },
        { status: 400 },
      );
    }

    /* ---------- Create Shopify customer ---------- */

    // Random password — klant hoeft dit nooit te weten
    const randomPassword = crypto.randomUUID() + "Aa1!";

    const result = await shopifyStorefront(CREATE_CUSTOMER, {
      input: {
        email,
        firstName: name || undefined,
        password: randomPassword,
        acceptsMarketing: true,
      },
    });

    // Handle top-level GraphQL errors
    if (result.errors?.length) {
      console.error("[subscribe] Shopify GraphQL errors:", result.errors);
      return NextResponse.json(
        { error: "Er ging iets mis bij het aanmelden. Probeer het opnieuw." },
        { status: 502 },
      );
    }

    const userErrors = result.data?.customerCreate?.customerUserErrors;

    if (userErrors && userErrors.length > 0) {
      const firstError = userErrors[0];

      // "TAKEN" = al geregistreerd — dat is ok, behandel als succes
      if (firstError.message === "Email has already been taken") {
        return NextResponse.json({ success: true });
      }

      return NextResponse.json(
        { error: firstError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 },
    );
  }
}
