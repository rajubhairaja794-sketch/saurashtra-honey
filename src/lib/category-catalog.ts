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

export const listPublicCategoriesFn = createServerFn({ method: "POST" }).handler(async (): Promise<{ categories: ShopCategory[], error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, slug, name, image_url, parent_id, sort_order, active, updated_at")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      return { categories: [], error: `Supabase Error: ${error.message} (Code: ${error.code})` };
    }
    
    if (!data) return { categories: [], error: null };

    const categories = data.map(c => ({
      ...c,
      image_url: c.image_url ? resolveImage(null, c.image_url, undefined, c.updated_at) : null
    })) as ShopCategory[];

    return { categories, error: null };
  } catch (err: any) {
    return { categories: [], error: `Network/Client Error: ${err.message}` };
  }
});

export async function fetchShopCategories(): Promise<ShopCategory[]> {
  try {
    const res = await listPublicCategoriesFn();
    return res.categories || [];
  } catch {
    return [];
  }
}
