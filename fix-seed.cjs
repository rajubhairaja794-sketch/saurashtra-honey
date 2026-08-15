const fs = require('fs');

const file = 'src/lib/admin-cms.functions.ts';
let content = fs.readFileSync(file, 'utf8');

// The function is export async function seedDefaultCategoriesIfEmpty(supabase: SB) {
// Replace context.supabase with supabase ONLY inside that function.
// Easiest is just replace "context.supabase" with "supabase" if it's followed by \n      .from("categories") inside the first try block. Or just use a regex.
// Let's just fix it properly by replacing the entire function string.

const newFn = `export async function seedDefaultCategoriesIfEmpty(supabase: SB) {
  try {
    const defaults = [
      { slug: "all-products", name: "All Products", sort_order: 1, active: true },
      { slug: "honey", name: "Honey", sort_order: 2, active: true },
      { slug: "beeswax", name: "Beeswax", sort_order: 3, active: true },
      { slug: "bee-pollen", name: "Bee Pollen", sort_order: 4, active: true },
      { slug: "beeswax-candle", name: "Beeswax Candles", sort_order: 5, active: true },
      { slug: "beauty-products", name: "Beauty Products", sort_order: 6, active: true },
    ];
    await supabase
      .from("categories")
      .upsert(defaults, { onConflict: "slug", ignoreDuplicates: true });

    // Safely migrate any products associated with disallowed categories and clean up disallowed category rows
    await supabase
      .from("products")
      .update({ category: "Beauty Products" })
      .in("name", ["Soft Skin Gel", "Royal Honey Glow Serum"]);

    await supabase
      .from("categories")
      .delete()
      .in("name", ["Virtual Categories", "New Category", "Virtual Collections"]);
  } catch (e) {
    console.error("Failed to seed categories:", e);
  }
}`;

content = content.replace(/export async function seedDefaultCategoriesIfEmpty\(supabase: SB\) \{[\s\S]*?\}\n\}/, newFn);
fs.writeFileSync(file, content, 'utf8');
