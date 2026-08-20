import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage, FALLBACK_IMAGE } from "@/lib/product-images";
import type { HeroSlide } from "@/components/site/HeroSlider";


import heroHoneyImg from "@/assets/hero-honey.jpg";
import heroProductsImg from "@/assets/hero-products.jpg";
import honeyDrizzleImg from "@/assets/honey-drizzle.jpg";
import honeycombBeesImg from "@/assets/honeycomb-bees.jpg";
import beeFlowerImg from "@/assets/bee-flower.jpg";
import beeFarmImg from "@/assets/bee-farm.jpg";
import familyHoneyImg from "@/assets/family-honey.jpg";

export type HeroRow = {
  id: string;
  page: string;
  title: string;
  image_key?: string;
  image_url?: string;
  mobile_image_url?: string;
  cta_href: string;
  sort_order: number;
  active: boolean;
  updated_at: string;
};

export function heroRowToSlide(r: HeroRow): HeroSlide {
  return {
    title: r.title || "Promotional Banner",
    image: resolveImage(r.image_key, r.image_url, FALLBACK_IMAGE, r.updated_at),
    mobileImage: r.mobile_image_url 
      ? `${r.mobile_image_url}${r.mobile_image_url.includes('?') ? '&' : '?'}v=${new Date(r.updated_at).getTime()}` 
      : undefined,
    ctaTo: r.cta_href || "/shop",
    updatedAt: r.updated_at,
  };
}

export function getDefaultHeroSlides(p: string = "home"): HeroSlide[] {
  return []; // Return empty array for unknown pages or errors to avoid leaking old data
}

export async function fetchHeroSlides(page: string): Promise<HeroSlide[]> {
  try {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("page", page)
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) {
      return getDefaultHeroSlides(page);
    }
    return (data as unknown as HeroRow[]).map((r) => heroRowToSlide(r));
  } catch {
    return getDefaultHeroSlides(page);
  }
}


