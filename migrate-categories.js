import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrate() {
  console.log("Fetching all products...");
  const { data: products, error: pErr } = await supabase.from('products').select('*');
  if (pErr) throw pErr;

  let updatedCount = 0;
  for (const p of products) {
    let newCategory = null;
    const currentCat = (p.category || "").toLowerCase().trim();

    if (currentCat === "beeswax products") {
      newCategory = "Beauty Products";
    } else if (currentCat === "multifllora" || currentCat === "multiflora") {
      newCategory = "Honey";
    } else if (currentCat === "beeswax candle") {
      newCategory = "Beeswax Candle"; 
    } else if (currentCat === "beeswax candles") {
      newCategory = "Beeswax Candle";
    }

    if (newCategory && p.category !== newCategory) {
      console.log(`Updating product ${p.name} from "${p.category}" to "${newCategory}"`);
      const { error: updErr } = await supabase.from('products').update({ category: newCategory }).eq('id', p.id);
      if (updErr) console.error("Error updating product:", updErr);
      else updatedCount++;
    }
  }
  console.log(`Updated ${updatedCount} products.`);

  console.log("Fetching categories to deactivate...");
  const categoriesToDeactivate = ["beeswax-products", "multifllora", "multiflora"];
  for (const slug of categoriesToDeactivate) {
    console.log(`Deactivating category: ${slug}`);
    const { error: updErr } = await supabase.from('categories').update({ active: false }).eq('slug', slug);
    if (updErr) console.error("Error updating category:", updErr);
  }

  const { error: catErr } = await supabase.from('categories').update({ name: 'Beeswax Candle' }).eq('slug', 'beeswax-candle');
  if (catErr) console.error("Error renaming beeswax candle:", catErr);

  console.log("Migration complete!");
}

migrate().catch(console.error);
