const fs = require('fs');
const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Format products to match DB schema exactly
const dbProducts = products.map(p => ({
  slug: p.slug,
  name: p.name,
  tagline: p.tagline || null,
  description: p.description || null,
  category: p.category || null,
  flora: p.flora || null,
  badge: p.badge || null,
  price: p.price,
  price_max: p.priceMax || null,
  mrp: p.mrp || null,
  rating: p.rating || 0,
  reviews_count: p.reviews || 0,
  sizes: p.sizes || [],
  benefits: p.benefits || [],
  image_key: p.image.replace('.jpg', '').replace('.png', ''), // e.g. "prod-ajwain"
  image_url: null,
  images: (p.images || []).map(img => img.replace('.jpg', '').replace('.png', '')),
  additional_images: (p.additionalImages || []).map(img => img.replace('.jpg', '').replace('.png', '')),
  attributes: p.attributes || null,
  published: true
}));

const dbVariants = [];
products.forEach(p => {
  p.variants.forEach((v, i) => {
    dbVariants.push({
      product_slug: p.slug, // Will resolve to product_id in seeder
      label: v.label,
      price: v.price,
      mrp: v.mrp || null,
      stock_quantity: v.stock || 100,
      is_active: v.inStock !== false,
      is_default: !!v.isDefault,
      sku: v.sku || null,
      weight_g: v.weightG || null,
      sort_order: i
    });
  });
});

const tsCode = `export const seederProducts = ${JSON.stringify(dbProducts, null, 2)};\n\nexport const seederVariants = ${JSON.stringify(dbVariants, null, 2)};`;

fs.writeFileSync('src/lib/seeder-data.ts', tsCode);
