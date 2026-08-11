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
  eyebrow: string | null;
  title: string;
  title_accent: string | null;
  subtitle: string | null;
  image_key: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string;
  align: string;
  sort_order: number;
  active: boolean;
};

export function heroRowToSlide(r: HeroRow, fallbackImg: string = FALLBACK_IMAGE): HeroSlide {
  return {
    image: resolveImage(r.image_key, r.image_url, fallbackImg),
    eyebrow: r.eyebrow ?? "",
    title: r.title_accent ? (
      <>
        {r.title}
        <br />
        <span className="italic text-brand-orange">{r.title_accent}</span>
      </>
    ) : (
      r.title
    ),
    subtitle: r.subtitle ?? "",
    ctaText: r.cta_label ?? "SHOP NOW",
    ctaTo: r.cta_href || "/shop",
    align: r.align === "center" ? "center" : "left",
  };
}

export function getDefaultHeroSlides(page: string): HeroSlide[] {
  const p = page.toLowerCase();
  if (p === "home") {
    return [
      {
        image: heroHoneyImg,
        eyebrow: "100% PURE & NATURAL",
        title: (
          <>
            Pure Honey.
            <br />
            <span className="italic text-brand-orange">Proven Purity.</span>
          </>
        ),
        subtitle:
          "Sustainably harvested from wild flora across Saurashtra. Raw, unfiltered, and lab-tested in every batch for your family's daily wellness.",
        ctaText: "SHOP PURE HONEY",
        ctaTo: "/shop",
        align: "left",
      },
      {
        image: heroProductsImg,
        eyebrow: "RAW & UNFILTERED",
        title: (
          <>
            Direct From Our
            <br />
            <span className="italic text-brand-orange">Floral Apiaries.</span>
          </>
        ),
        subtitle:
          "No heating, no processing, and no artificial sweeteners. Just unadulterated golden sweetness from wild wildflower farms.",
        ctaText: "EXPLORE COLLECTION",
        ctaTo: "/shop",
        align: "left",
      },
      {
        image: honeyDrizzleImg,
        eyebrow: "LAB TESTED IN EVERY BATCH",
        title: (
          <>
            Verified For Zero
            <br />
            <span className="italic text-brand-orange">Sugar Adulteration.</span>
          </>
        ),
        subtitle:
          "Every batch undergoes rigorous NMR & purity testing to guarantee 100% genuine, natural honey from hive to table.",
        ctaText: "VIEW TEST REPORTS",
        ctaTo: "/our-story",
        align: "left",
      },
      {
        image: beeFarmImg,
        eyebrow: "TRACEABLE BEE FARMING",
        title: (
          <>
            Ethical Beekeeping
            <br />
            <span className="italic text-brand-orange">Across Saurashtra.</span>
          </>
        ),
        subtitle:
          "Our apiaries preserve healthy bee colonies while supporting local wildflower biodiversity and rural beekeeping families.",
        ctaText: "TRACE YOUR HONEY",
        ctaTo: "/bee-farming",
        align: "left",
      },
      {
        image: honeycombBeesImg,
        eyebrow: "THE SAURASHTRA TRADITION",
        title: (
          <>
            Three Generations
            <br />
            <span className="italic text-brand-orange">of Honey Makers.</span>
          </>
        ),
        subtitle:
          "Rooted in the golden soils of Gujarat, combining age-old harvesting wisdom with modern lab testing standards.",
        ctaText: "READ OUR STORY",
        ctaTo: "/our-story",
        align: "left",
      },
      {
        image: beeFlowerImg,
        eyebrow: "DAILY FAMILY WELLNESS",
        title: (
          <>
            Rich in Natural
            <br />
            <span className="italic text-brand-orange">Enzymes &amp; Pollen.</span>
          </>
        ),
        subtitle:
          "Packed with natural antioxidants and immunity-boosting nutrients for your everyday health and vitality.",
        ctaText: "SHOP BEST SELLERS",
        ctaTo: "/shop",
        align: "left",
      },
      {
        image: familyHoneyImg,
        eyebrow: "BULK & CORPORATE GIFTING",
        title: (
          <>
            Custom Golden
            <br />
            <span className="italic text-brand-orange">Gift Hampers.</span>
          </>
        ),
        subtitle:
          "Delight your partners, guests, and employees with premium honey hampers crafted with love from Saurashtra.",
        ctaText: "ENQUIRE NOW",
        ctaTo: "/bulk-orders",
        align: "left",
      },
    ];
  }

  if (p === "shop") {
    return [
      {
        image: heroProductsImg,
        eyebrow: "SAURASHTRA HONEY SHOP",
        title: (
          <>
            100% Pure Raw Honey
            <br />
            <span className="italic text-brand-orange">Direct From Our Apiary</span>
          </>
        ),
        subtitle: "Harvested ethically across the floral farms of Saurashtra. Every jar lab-tested for guaranteed purity.",
        ctaText: "EXPLORE HONEYS",
        ctaTo: "/shop",
        align: "left",
      },
      {
        image: honeyDrizzleImg,
        eyebrow: "LIMITED FLAVOR HARVEST",
        title: (
          <>
            Monofloral &amp; Wild
            <br />
            <span className="italic text-brand-orange">Artisanal Collections</span>
          </>
        ),
        subtitle: "From fragrant Lychee blossom to rare Ajwain honey, taste the authentic nectar of regional flora.",
        ctaText: "SHOP MONOFLORAL",
        ctaTo: "/shop",
        align: "left",
      },
      {
        image: heroHoneyImg,
        eyebrow: "FAMILY WELLNESS PACKS",
        title: (
          <>
            Pure Unprocessed
            <br />
            <span className="italic text-brand-orange">Daily Health Essentials</span>
          </>
        ),
        subtitle: "Rich in enzymes and natural antioxidants. Zero heating, zero sugar syrups, 100% genuine.",
        ctaText: "VIEW BEST SELLERS",
        ctaTo: "/shop",
        align: "left",
      },
    ];
  }

  if (p === "our-story") {
    return [
      {
        image: familyHoneyImg,
        eyebrow: "ROOTED IN SAURASHTRA",
        title: (
          <>
            Our Heritage of
            <br />
            <span className="italic text-brand-orange">Ethical Honey Craft</span>
          </>
        ),
        subtitle: "Three generations dedicated to preserving the purest traditions of natural beekeeping across Gujarat.",
        ctaText: "READ OUR HERITAGE",
        ctaTo: "/our-story",
        align: "left",
      },
      {
        image: honeycombBeesImg,
        eyebrow: "FROM HIVE TO TABLE",
        title: (
          <>
            No Middlemen.
            <br />
            <span className="italic text-brand-orange">Pure Transparency.</span>
          </>
        ),
        subtitle: "We oversee every step of the journey so you can trust what is inside your family's honey jar.",
        ctaText: "OUR PROMISE",
        ctaTo: "/our-story",
        align: "left",
      },
      {
        image: beeFarmImg,
        eyebrow: "LAB VERIFIED PURITY",
        title: (
          <>
            Rigorous Science
            <br />
            <span className="italic text-brand-orange">Meets Tradition</span>
          </>
        ),
        subtitle: "Uncompromising quality checks and independent NMR lab verification for every single batch we produce.",
        ctaText: "VIEW LAB REPORTS",
        ctaTo: "/our-story",
        align: "left",
      },
    ];
  }

  if (p === "bee-farming") {
    return [
      {
        image: beeFarmImg,
        eyebrow: "ETHICAL BEEKEEPING",
        title: (
          <>
            Respecting Bees,
            <br />
            <span className="italic text-brand-orange">Protecting Nature</span>
          </>
        ),
        subtitle: "We never over-harvest or feed sugar syrups to our bee colonies. Sustainable apiaries across Saurashtra.",
        ctaText: "EXPLORE APIARIES",
        ctaTo: "/bee-farming",
        align: "left",
      },
      {
        image: beeFlowerImg,
        eyebrow: "BIODIVERSITY & FLORA",
        title: (
          <>
            Pollinating Our
            <br />
            <span className="italic text-brand-orange">Wildflower Farms</span>
          </>
        ),
        subtitle: "Our hives contribute to local farm pollination while capturing the rich floral nectar of the region.",
        ctaText: "LEARN MORE",
        ctaTo: "/bee-farming",
        align: "left",
      },
      {
        image: honeycombBeesImg,
        eyebrow: "TRACE YOUR HONEY",
        title: (
          <>
            100% Traceable
            <br />
            <span className="italic text-brand-orange">From Hive to Jar</span>
          </>
        ),
        subtitle: "Every batch is mapped to its exact floral origin and harvesting season for total peace of mind.",
        ctaText: "TRACE HARVEST",
        ctaTo: "/bee-farming",
        align: "left",
      },
    ];
  }

  if (p === "blog") {
    return [
      {
        image: honeycombBeesImg,
        eyebrow: "THE SAURASHTRA JOURNAL",
        title: (
          <>
            Stories of Pure Honey
            <br />
            <span className="italic text-brand-orange">&amp; Natural Living</span>
          </>
        ),
        subtitle: "Explore wellness tips, authentic recipes, and beekeeping notes from our apiary experts.",
        ctaText: "READ LATEST POSTS",
        ctaTo: "/blog",
        align: "left",
      },
      {
        image: honeyDrizzleImg,
        eyebrow: "RECIPES & REMEDIES",
        title: (
          <>
            Daily Wellness
            <br />
            <span className="italic text-brand-orange">With Raw Honey</span>
          </>
        ),
        subtitle: "Discover how to substitute refined sugar with antioxidant-rich raw honey in your daily meals.",
        ctaText: "EXPLORE RECIPES",
        ctaTo: "/blog",
        align: "left",
      },
      {
        image: beeFlowerImg,
        eyebrow: "BEEKEEPER NOTES",
        title: (
          <>
            Inside The Hive
            <br />
            <span className="italic text-brand-orange">&amp; Seasonal Harvests</span>
          </>
        ),
        subtitle: "Follow the seasonal journey of wild bees across Saurashtra's changing blossoms.",
        ctaText: "VIEW NOTES",
        ctaTo: "/blog",
        align: "left",
      },
    ];
  }

  if (p === "bulk-orders") {
    return [
      {
        image: honeyDrizzleImg,
        eyebrow: "BULK & CORPORATE GIFTING",
        title: (
          <>
            Premium Honey Hampers
            <br />
            <span className="italic text-brand-orange">&amp; Bulk Supply</span>
          </>
        ),
        subtitle: "Custom golden gift boxes for corporate events, weddings, and hospitality partners across India.",
        ctaText: "REQUEST A QUOTE",
        ctaTo: "/bulk-orders",
        align: "left",
      },
      {
        image: heroProductsImg,
        eyebrow: "CUSTOM BRANDING",
        title: (
          <>
            Tailored Packaging
            <br />
            <span className="italic text-brand-orange">For Your Organization</span>
          </>
        ),
        subtitle: "Personalized jars, wooden dippers, and bespoke gift boxes crafted to reflect your brand excellence.",
        ctaText: "VIEW OPTIONS",
        ctaTo: "/bulk-orders",
        align: "left",
      },
      {
        image: heroHoneyImg,
        eyebrow: "WHOLESALE & RETAIL",
        title: (
          <>
            Reliable Pan-India
            <br />
            <span className="italic text-brand-orange">Bulk Honey Partner</span>
          </>
        ),
        subtitle: "Consistent quality, lab-certified purity, and seamless pan-India logistics for bulk orders.",
        ctaText: "ENQUIRE NOW",
        ctaTo: "/bulk-orders",
        align: "left",
      },
    ];
  }

  if (p === "contact") {
    return [
      {
        image: beeFarmImg,
        eyebrow: "WE ARE HERE FOR YOU",
        title: (
          <>
            Get in Touch With
            <br />
            <span className="italic text-brand-orange">Saurashtra Honey</span>
          </>
        ),
        subtitle: "Have questions about our honeys, lab reports, or bulk orders? Our team is always ready to assist.",
        ctaText: "CONTACT SUPPORT",
        ctaTo: "/contact",
        align: "left",
      },
      {
        image: familyHoneyImg,
        eyebrow: "CUSTOMER CARE",
        title: (
          <>
            Questions About
            <br />
            <span className="italic text-brand-orange">Your Honey Order?</span>
          </>
        ),
        subtitle: "We are committed to transparent communication and complete customer satisfaction.",
        ctaText: "SEND A MESSAGE",
        ctaTo: "/contact",
        align: "left",
      },
      {
        image: heroHoneyImg,
        eyebrow: "PARTNER WITH US",
        title: (
          <>
            Retail &amp; Distribution
            <br />
            <span className="italic text-brand-orange">Inquiries Welcome</span>
          </>
        ),
        subtitle: "Join our growing network of wellness partners and bring pure Saurashtra Honey to your city.",
        ctaText: "BECOME A PARTNER",
        ctaTo: "/contact",
        align: "left",
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
