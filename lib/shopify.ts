// lib/shopify.ts

export async function createShopifyCheckout(items: any[]) {
  const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;

  // Create cart
  const cartResponse = await fetch(
    `https://${domain}/api/2024-01/graphql.json`,
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
  const cartId = cartData?.data?.cartCreate?.cart?.id;

  if (!cartId) {
    console.error("Error creating cart:", cartData);
    return cartData;
  }

  // Convert your line items → Shopify format
  const lines = items.map(item => ({
    quantity: item.quantity ?? 1,
    merchandiseId: item.variantId,
  }));

  // Add items
  const addLinesResponse = await fetch(
    `https://${domain}/api/2024-01/graphql.json`,
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
