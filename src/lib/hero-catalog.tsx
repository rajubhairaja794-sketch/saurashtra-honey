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
  if (p === "home") {
    return [
      {
        title: "Pure Honey",
        image: heroHoneyImg,
        ctaTo: "/shop",
      },
      {
        title: "Our Story",
        image: honeycombBeesImg,
        ctaTo: "/our-story",
      },
      {
        title: "Ethical Beekeeping",
        image: beeFarmImg,
        ctaTo: "/our-story",
      },
    ];
  }

  if (p === "bee-farming") {
    return [
      {
        title: "Bee Farming Process",
        image: beeFarmImg,
        ctaTo: "/bee-farming",
      },
      {
        title: "Floral Sources",
        image: beeFlowerImg,
        ctaTo: "/bee-farming",
      },
      {
        title: "Happy Bees",
        image: honeycombBeesImg,
        ctaTo: "/bee-farming",
      },
    ];
  }

  if (p === "blog") {
    return [
      {
        title: "Honey Journal",
        image: honeycombBeesImg,
        ctaTo: "/blog",
      },
      {
        title: "Recipes & Uses",
        image: honeyDrizzleImg,
        ctaTo: "/blog",
      },
      {
        title: "Health Benefits",
        image: beeFlowerImg,
        ctaTo: "/blog",
      },
    ];
  }

  if (p === "bulk-orders") {
    return [
      {
        title: "Bulk Supply",
        image: honeyDrizzleImg,
        ctaTo: "/bulk-orders",
      },
      {
        title: "Corporate Gifting",
        image: heroProductsImg,
        ctaTo: "/bulk-orders",
      },
      {
        title: "Wholesale Honey",
        image: heroHoneyImg,
        ctaTo: "/bulk-orders",
      },
    ];
  }

  if (p === "contact") {
    return [
      {
        title: "Get in Touch",
        image: beeFarmImg,
        ctaTo: "/contact",
      },
      {
        title: "Visit Our Farm",
        image: familyHoneyImg,
        ctaTo: "/contact",
      },
      {
        title: "Customer Support",
        image: heroHoneyImg,
        ctaTo: "/contact",
      },
    ];
  }

  return []; // Return empty array for unknown pages to avoid leaking Home slides
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


