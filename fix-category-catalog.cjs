const fs = require('fs');

const file = 'src/lib/category-catalog.ts';
let content = fs.readFileSync(file, 'utf8');

const newFn = `export const listPublicCategoriesFn = createServerFn({ method: "POST" }).handler(async () => {
  // Try to fetch from the public storage bucket bypass cache
  const url = "https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/public_cache/categories.json?t=" + Date.now();
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return (data ?? [])
        .filter((r: Row) => !DISALLOWED_SLUGS.includes(r.slug.toLowerCase().trim()))
        .map((r: Row) => ({
          slug: r.slug,
          name: r.name,
          image: resolveImage(null, r.image_url, FALLBACK_IMAGE_BY_SLUG[r.slug] || honeyFallback, r.updated_at),
          hasCustomImage: !!r.image_url,
          updatedAt: r.updated_at,
        }));
    }
  } catch (e) {
    console.warn("Failed to fetch public categories cache:", e);
  }

  // Fallback to the DB directly (which might fail due to RLS for unauthenticated users)
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase
    .from("categories")
    .select("slug,name,image_url,sort_order,active,updated_at")
    .eq("active", true)
    .order("sort_order", { ascending: true });
    
  if (error) {
    console.error("Failed to fetch categories from Supabase (listPublicCategoriesFn):", error);
    throw new Error(error.message);
  }
  
  return (data ?? [])
    .filter((r: Row) => !DISALLOWED_SLUGS.includes(r.slug.toLowerCase().trim()))
    .map((r: Row) => ({
      slug: r.slug,
      name: r.name,
      image: resolveImage(null, r.image_url, FALLBACK_IMAGE_BY_SLUG[r.slug] || honeyFallback, r.updated_at),
      hasCustomImage: !!r.image_url,
      updatedAt: r.updated_at,
    }));
});`;

content = content.replace(/export const listPublicCategoriesFn = createServerFn\(\{ method: "POST" \}\)\.handler\(async \(\) => \{[\s\S]*?\}\);/, newFn);
fs.writeFileSync(file, content, 'utf8');
