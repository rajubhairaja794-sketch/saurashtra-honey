import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function AutoSeeder() {
  const hasRun = useRef(false);
  const [status, setStatus] = useState<string>("Checking product catalog...");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function seedData() {
      try {
        console.log("AutoSeeder: Checking if products need to be seeded...");
        // Check current count
        const { count, error: countErr } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        if (countErr) {
            console.error("AutoSeeder count error:", countErr);
            setStatus("Error connecting to Supabase.");
            setLoading(false);
            return;
        }

        // We know we want EXACTLY 35 products. Let's just run the upsert anyway
        // to make sure they are ALL present and updated.
        setStatus(`Synchronizing catalog (found ${count} products)...`);
        
        const res = await fetch("/products.json");
        if (!res.ok) {
            setStatus("Failed to load products.json");
            setLoading(false);
            return;
        }
        
        const products = await res.json();
        
        // Fetch existing slugs to avoid overwriting manually edited Admin data
        const { data: existingData, error: extErr } = await supabase
          .from("products")
          .select("slug");
        
        if (extErr) {
          console.error("AutoSeeder fetch existing error:", extErr);
          setStatus("Error checking existing products.");
          setLoading(false);
          return;
        }

        const existingSlugs = new Set(existingData.map((r) => r.slug));
        const missingProducts = products.filter((p: any) => !existingSlugs.has(p.slug));

        if (missingProducts.length === 0) {
          console.log("AutoSeeder: All products exist. No synchronization needed.");
          setStatus("Successfully synchronized to Supabase.");
          setLoading(false);
          return;
        }
        
        let successCount = 0;
        
        for (const p of missingProducts) {
            setStatus(`Syncing missing product: ${p.name}...`);
            
            const imageKey = p.image ? p.image.replace('.jpg', '').replace('.png', '') : null;
            const images = (p.images || []).map((img: string) => img.replace('.jpg', '').replace('.png', ''));
            const additionalImages = (p.additionalImages || []).map((img: string) => img.replace('.jpg', '').replace('.png', ''));

            const { data: prodData, error: pErr } = await supabase
            .from("products")
            .insert({
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
                image_key: imageKey,
                image_url: null,
                images: images,
                published: true
            })
            .select("id")
            .single();

          if (pErr) {
            console.error(`AutoSeeder Error on product ${p.slug}:`, pErr);
            continue;
          }

          // Insert variants
          if (p.variants && p.variants.length > 0) {
            for (let i = 0; i < p.variants.length; i++) {
                const v = p.variants[i];
                const { error: vErr } = await supabase
                .from("product_variants")
                .upsert({
                    product_id: prodData.id,
                    label: v.label,
                    price: v.price,
                    mrp: v.mrp || null,
                    stock_quantity: v.stock || 100,
                    is_active: v.inStock !== false,
                    is_default: !!v.isDefault,
                    sku: v.sku || null,
                    weight_g: v.weightG || null,
                    sort_order: i
                }, { onConflict: "product_id,label" });

                if (vErr) {
                console.error(`AutoSeeder Error on variant ${v.label} for ${p.slug}:`, vErr);
                }
            }
          }
          successCount++;
        }
        console.log(`AutoSeeder: Successfully synced ${successCount} products.`);
        setStatus(`Successfully synchronized ${successCount} products to Supabase.`);
        setLoading(false);
      } catch (err) {
        console.error("AutoSeeder: Uncaught error:", err);
        setStatus("An error occurred during synchronization.");
        setLoading(false);
      }
    }

    seedData();
  }, []);

  if (!loading && status.includes("Successfully")) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-md mb-6 flex items-center justify-between">
        <div>
            <h3 className="font-semibold">Catalog Synchronization</h3>
            <p className="text-sm opacity-90">{status}</p>
        </div>
        {loading && <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>}
    </div>
  );
}
