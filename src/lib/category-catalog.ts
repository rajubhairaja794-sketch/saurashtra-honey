import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import honeyFallback from "@/assets/hero-honey.jpg";
import beeswaxFallback from "@/assets/prod-honeycomb.jpg";
import pollenFallback from "@/assets/mortar-herbs.jpg";
import candleFallback from "@/assets/honeycomb-bees.jpg";
import giftpackFallback from "@/assets/prod-giftpack.jpg";
import beautyFallback from "@/assets/prod-lychee.jpg";
import allProductsFallback from "@/assets/hero-products.jpg";

export type ShopCategory = {
  slug: string;
  name: string;
  /** Resolved, ready-to-render image (DB image_url if set, else a bundled fallback). */
  image: string;
  /** Whether the image came from the Admin-managed image_url (vs. a local fallback). */
  hasCustomImage: boolean;
};

type Row = {
  slug: string;
  name: string;
  image_url: string | null;
  sort_order: number;
  active: boolean;
};

// High-resolution local fallback photos so the storefront never renders an empty or
// low-res placeholder card.
const FALLBACK_IMAGE_BY_SLUG: Record<string, string> = {
  honey: honeyFallback,
  beeswax: beeswaxFallback,
  "bee-pollen": pollenFallback,
  "beeswax-candle": candleFallback,
  "beeswax-products": giftpackFallback,
  "body-care": beautyFallback,
  "hair-care": beautyFallback,
  "lip-care": giftpackFallback,
  "skin-care": beautyFallback,
  "wood-leather-care": beeswaxFallback,
  "beauty-products": beautyFallback,
  "all-products": allProductsFallback,
};

export const DEFAULT_SHOP_CATEGORIES: ShopCategory[] = [
  { slug: "all-products", name: "All Products" },
  { slug: "honey", name: "Honey" },
  { slug: "beeswax", name: "Beeswax" },
  { slug: "bee-pollen", name: "Bee Pollen" },
  { slug: "beeswax-candle", name: "Beeswax Candles" },
  { slug: "beeswax-products", name: "Beeswax Products" },
  { slug: "beauty-products", name: "Beauty Products" },
].map((c) => ({
  ...c,
  image: FALLBACK_IMAGE_BY_SLUG[c.slug] ?? honeyFallback,
  hasCustomImage: false,
}));

function toShopCategory(r: Row): ShopCategory {
  const custom = !!r.image_url;
  return {
    slug: r.slug,
    name: r.name,
    image: r.image_url || FALLBACK_IMAGE_BY_SLUG[r.slug] || honeyFallback,
    hasCustomImage: custom,
  };
}

const DISALLOWED_SLUGS = [
  "body-care",
  "hair-care",
  "lip-care",
  "skin-care",
  "wood-leather-care",
  "single-flora",
];

export const listPublicCategoriesFn = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { seedDefaultCategoriesIfEmpty } = await import("@/lib/admin-cms.functions");
  await seedDefaultCategoriesIfEmpty(supabaseAdmin);
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("slug,name,image_url,sort_order,active")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? [])
    .filter((r: Row) => !DISALLOWED_SLUGS.includes(r.slug.toLowerCase().trim()))
    .map((r: Row) => ({
      slug: r.slug,
      name: r.name,
      image: r.image_url || FALLBACK_IMAGE_BY_SLUG[r.slug] || honeyFallback,
      hasCustomImage: !!r.image_url,
    }));
});

export async function fetchShopCategories(): Promise<ShopCategory[]> {
  try {
    const rows = await listPublicCategoriesFn();
    return rows;
  } catch {
    return DEFAULT_SHOP_CATEGORIES;
  }
}
