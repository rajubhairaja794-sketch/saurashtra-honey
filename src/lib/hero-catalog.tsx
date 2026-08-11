import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage, FALLBACK_IMAGE } from "@/lib/product-images";
import type { HeroSlide } from "@/components/site/HeroSlider";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
  image_key?: string;
  image_url?: string;
  mobile_image_url?: string;
  cta_href: string;
  sort_order: number;
  active: boolean;
};

export function heroRowToSlide(r: HeroRow): HeroSlide {
  return {
    image: resolveImage(r.image_key, r.image_url, FALLBACK_IMAGE),
    mobileImage: r.mobile_image_url || undefined,
    ctaTo: r.cta_href || "/shop",
  };
}

export function getDefaultHeroSlides(p: string = "home"): HeroSlide[] {
  if (p === "home") {
    return [
      {
        image: heroHoneyImg,
        ctaTo: "/shop",
      },
      {
        image: honeycombBeesImg,
        ctaTo: "/our-story",
      },
      {
        image: beeFarmImg,
        ctaTo: "/our-story",
      },
    ];
  }

  if (p === "bee-farming") {
    return [
      {
        image: beeFarmImg,
        ctaTo: "/bee-farming",
      },
      {
        image: beeFlowerImg,
        ctaTo: "/bee-farming",
      },
      {
        image: honeycombBeesImg,
        ctaTo: "/bee-farming",
      },
    ];
  }

  if (p === "blog") {
    return [
      {
        image: honeycombBeesImg,
        ctaTo: "/blog",
      },
      {
        image: honeyDrizzleImg,
        ctaTo: "/blog",
      },
      {
        image: beeFlowerImg,
        ctaTo: "/blog",
      },
    ];
  }

  if (p === "bulk-orders") {
    return [
      {
        image: honeyDrizzleImg,
        ctaTo: "/bulk-orders",
      },
      {
        image: heroProductsImg,
        ctaTo: "/bulk-orders",
      },
      {
        image: heroHoneyImg,
        ctaTo: "/bulk-orders",
      },
    ];
  }

  if (p === "contact") {
    return [
      {
        image: beeFarmImg,
        ctaTo: "/contact",
      },
      {
        image: familyHoneyImg,
        ctaTo: "/contact",
      },
      {
        image: heroHoneyImg,
        ctaTo: "/contact",
      },
    ];
  }

  return getDefaultHeroSlides("home");
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

export const fetchPublicHeroRows = createServerFn({ method: "POST" })
  .inputValidator((d: { page: string }) => z.object({ page: z.string() }).parse(d))
  .handler(async ({ data: { page } }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("hero_slides")
        .select("*")
        .eq("page", page)
        .eq("active", true)
        .order("sort_order", { ascending: true });
        
      if (error || !data || data.length === 0) {
        return { rows: [] };
      }
      return { rows: data as unknown as HeroRow[] };
    } catch (err) {
      console.error("fetchPublicHeroRows error:", err);
      return { rows: [] };
    }
  });
