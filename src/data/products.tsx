export const products = [
  {
    id: 1,
    name: 'PSP TEE',
    price: '$30',
    image: '/images/products/psp_render.webp',
    extraImages: ['/images/products/psp_detail.jpg', '/images/products/psp_front.jpg', 
      '/images/products/psp_back.jpg', '/images/products/psp_duo.jpg'],
    description: 'For everyone who kept their PSP charged past midnight. 100% cotton.',
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", variantId: "gid://shopify/ProductVariant/52162727346490" },
      { size: "M", variantId: "gid://shopify/ProductVariant/52162727379258" },
      { size: "L", variantId: "gid://shopify/ProductVariant/52162727412026" }
    ]
  },
  {
    id: 2,
    name: 'TIME F*CKS TEE',
    price: '$30',
    image: '/images/products/tf_render_f.webp',
    hoverImage: '/images/products/tf_render_b.webp',
    extraImages: ['/images/products/tf_detail.jpg', '/images/products/tf_front.jpg', 
      '/images/products/tf_back.jpg', '/images/products/tf_duo.jpg'],
    description: 'The most honest thing you\'ll wear this year. 100% cotton.',
    sizes: ["S", "M", "L"],
    variants: [
      { size: "S", variantId: "gid://shopify/ProductVariant/52162733343034" },
      { size: "M", variantId: "gid://shopify/ProductVariant/52162733375802" },
      { size: "L", variantId: "gid://shopify/ProductVariant/52162733408570" }
    ]
  },
];
