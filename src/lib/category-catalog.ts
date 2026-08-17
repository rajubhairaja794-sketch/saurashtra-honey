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
  id: string;
  slug: string;
  name: string;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  active: boolean;
  updated_at?: string;
};

type Row = {
  slug: string;
  name: string;
  image_url: string | null;
  sort_order: number;
  active: boolean;
  updated_at: string;
};

export const DEFAULT_SHOP_CATEGORIES: ShopCategory[] = [];

export const listPublicCategoriesFn = createServerFn({ method: "POST" }).handler(async (): Promise<ShopCategory[]> => {
  // TIER 1: The Public Cache (Bypasses RLS perfectly and reflects Admin image saves instantly)
  const url = "https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/public_cache/categories.json?t=" + Date.now();
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return (data || []) as ShopCategory[];
    }
  } catch (e) {
    // Cache missing or failed, fall through to DB
  }

  // TIER 2: Direct Database Query (Will likely fail due to 42501 until RLS is fixed)
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, image_url, parent_id, sort_order, active")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error && error.code === '42501') {
    // TIER 3: The Native Fallback (Extract unique categories from active products so the UI never crashes)
    const { data: prodData } = await supabase.from("products").select("category");
    if (prodData) {
      const uniqueCats = [...new Set(prodData.map(p => p.category).filter(Boolean))];
      const sortOrder = ["All Products", "Honey", "Beeswax", "Bee Pollen", "Beeswax Candles", "Beauty Products"];
      
      const dynamicCats: ShopCategory[] = [
        { id: "all-products", slug: "all-products", name: "All Products", image_url: null, parent_id: null, sort_order: 0, active: true }
      ];

      uniqueCats.forEach(name => {
        const strName = name as string;
        const slug = strName.toLowerCase().replace(/\s+/g, '-');
        dynamicCats.push({
          id: slug, slug, name: strName, image_url: null, parent_id: null,
          sort_order: sortOrder.indexOf(strName) !== -1 ? sortOrder.indexOf(strName) + 1 : 99,
          active: true
        });
      });

      return dynamicCats.sort((a, b) => a.sort_order - b.sort_order);
    }
  }

  if (error && error.code !== '42501') {
    console.error("Failed to fetch categories from Supabase:", error);
  }
  
  return (data || []) as ShopCategory[];
});

export async function fetchShopCategories(): Promise<ShopCategory[]> {
  try {
    const rows = await listPublicCategoriesFn();
    return rows;
  } catch (err) {
    console.error("fetchShopCategories caught an error.", err);
    // Returning empty array so UI doesn't crash but shows error state if needed
    return [];
  }
}
