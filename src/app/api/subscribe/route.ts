import { NextRequest, NextResponse } from "next/server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyStorefront(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, size, source, type } = body;

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email en type zijn verplicht." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres." },
        { status: 400 }
      );
    }

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

    const errors = result.data?.customerCreate?.customerUserErrors;

    // "TAKEN" = al geregistreerd, dat is ok
    if (errors?.length > 0 && errors[0].message !== "Email has already been taken") {
      return NextResponse.json(
        { error: errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Er ging iets mis." },
      { status: 500 }
    );
  }
}
