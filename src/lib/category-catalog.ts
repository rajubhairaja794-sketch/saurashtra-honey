import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage } from "@/lib/product-images";
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
  updatedAt?: string;
};

type Row = {
  slug: string;
  name: string;
  image_url: string | null;
  sort_order: number;
  active: boolean;
  updated_at: string;
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
  "multiflora",
  "beeswax-products"
];

export const listPublicCategoriesFn = createServerFn({ method: "POST" }).handler(async () => {
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
});

export async function fetchShopCategories(): Promise<ShopCategory[]> {
  try {
    const rows = await listPublicCategoriesFn();
    // Only use fallback if database is completely empty (no categories returned)
    // rather than falling back on ANY network/API key error.
    if (!rows || rows.length === 0) {
      console.warn("Database returned 0 categories, using defaults");
      return DEFAULT_SHOP_CATEGORIES;
    }
    return rows;
  } catch (err) {
    console.error("fetchShopCategories caught an error. Falling back to defaults to prevent crash.", err);
    return DEFAULT_SHOP_CATEGORIES;
  }
}
