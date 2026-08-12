const fs = require('fs');
const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

function getProductVariants(product) {
  if (product.variants && product.variants.length > 0) {
    return product.variants;
  }
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ["Standard"];
  const multipliers = {
    "250g": { factor: 1, mrpFactor: 1.15, weight: 250 },
    "500g": { factor: 1.716, mrpFactor: 1.15, weight: 500 }, 
    "1kg": { factor: 2.862, mrpFactor: 1.15, weight: 1000 }, 
    "250ml": { factor: 1, mrpFactor: 1.15, weight: 250 },
    "500ml": { factor: 1.803, mrpFactor: 1.15, weight: 500 }, 
    "100g": { factor: 0.6, mrpFactor: 1.15, weight: 100 },
  };

  return sizes.map((s, idx) => {
    const mult = multipliers[s] || { factor: idx === 0 ? 1 : idx === 1 ? 1.7 : 2.5, mrpFactor: 1.15, weight: 250 };
    const price = Math.round(product.price * mult.factor);
    const mrp = product.mrp ? Math.round(product.mrp * mult.factor) : Math.round(price * mult.mrpFactor);
    return {
      id: `${product.slug}-${s.toLowerCase()}`,
      label: s,
      price,
      mrp,
      stock: 100,
      inStock: true,
      isDefault: idx === 0,
      sku: `SH-${product.slug.toUpperCase().slice(0, 4)}-${s.toUpperCase()}`,
      weightG: mult.weight,
    };
  });
}

products.forEach(p => {
    p.variants = getProductVariants(p);
});

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
