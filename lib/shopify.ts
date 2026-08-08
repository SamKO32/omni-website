// lib/shopify.ts

const API_VERSION = "2024-01";

export async function createShopifyCheckout(items: any[]) {
  const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;

  // Create cart
  const cartResponse = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `
          mutation CreateCart {
            cartCreate {
              cart {
                id
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
      }),
    }
  );

  const cartData = await cartResponse.json();
  const cartCreate = cartData?.data?.cartCreate;
  const cartId = cartCreate?.cart?.id;

  const userErrors = cartCreate?.userErrors;
  if (userErrors?.length) {
    console.error("Shopify cartCreate userErrors:", userErrors);
    throw new Error(userErrors[0]?.message ?? "Failed to create cart");
  }

  if (!cartId) {
    console.error("Error creating cart:", cartData);
    throw new Error("Cart creation failed — no cart ID returned");
  }

  // Convert your line items → Shopify format
  const lines = items.map(item => ({
    quantity: item.quantity ?? 1,
    merchandiseId: item.variantId,
  }));

  // Add items
  const addLinesResponse = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `
          mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                id
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          cartId,
          lines
        }
      }),
    }
  );

  const addLinesData = await addLinesResponse.json();
  return addLinesData;
}
