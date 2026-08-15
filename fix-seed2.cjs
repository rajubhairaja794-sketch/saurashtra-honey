const fs = require('fs');
const file = 'src/lib/supply-services-catalog.ts';
let content = fs.readFileSync(file, 'utf8');

const newFn = `export async function seedWhoWeSupplyIfEmpty(supabase: any) {
  try {
    const { count, error } = await supabase
      .from("who_we_supply_services")
      .select("id", { count: "exact", head: true });
    if (!error && (count === 0 || count === null)) {
      const rowsToInsert = [
        {
          title: "Premium Bakeries & Patisseries",
          description: "Artisanal bakeries across India trust our pure honey and beeswax to create signature pastries, glazes, and naturally sweetened baked goods.",
          image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60",
          sort_order: 1,
          active: true
        },
        {
          title: "Luxury Hotels & Resorts",
          description: "Five-star hospitality brands feature Saurashtra Honey at breakfast buffets, in premium rooms, and as part of exclusive wellness retreats.",
          image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60",
          sort_order: 2,
          active: true
        },
        {
          title: "Ayurvedic & Wellness Brands",
          description: "Leading natural health companies source our raw honey and bee pollen as foundational ingredients for traditional remedies and modern supplements.",
          image_url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=60",
          sort_order: 3,
          active: true
        },
        {
          title: "Boutique Cafés",
          description: "Specialty coffee shops and organic cafés serve our unique monofloral honeys to complement artisanal beverages and healthy breakfast bowls.",
          image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=60",
          sort_order: 4,
          active: true
        }
      ];
      await supabase.from("who_we_supply_services").insert(rowsToInsert as never);
    }
  } catch (e) {
    console.error("Failed to seed who we supply:", e);
  }
}`;

content = content.replace(/export async function seedWhoWeSupplyIfEmpty\(supabase: any\) \{[\s\S]*?\}\n\}/, newFn);
fs.writeFileSync(file, content, 'utf8');
