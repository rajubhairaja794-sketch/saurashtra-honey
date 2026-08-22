import { supabase } from "@/integrations/supabase/client";
import ajwain from "@/assets/prod-ajwain.jpg";
import fennel from "@/assets/prod-fennel.jpg";
import lychee from "@/assets/prod-lychee.jpg";
import multiflora from "@/assets/prod-multiflora.jpg";
import squeeze from "@/assets/prod-squeeze.jpg";
import honeycomb from "@/assets/prod-honeycomb.jpg";
import giftpack from "@/assets/prod-giftpack.jpg";
import hero from "@/assets/hero-honey.jpg";
import beeFarm from "@/assets/bee-farm.jpg";
import drizzle from "@/assets/honey-drizzle.jpg";
import family from "@/assets/family-honey.jpg";
import beeFlower from "@/assets/bee-flower.jpg";
import liquid from "@/assets/prod-liquid.jpg";
import team from "@/assets/team-beekeepers.jpg";
import beeswaxPellets from "@/assets/prod-beeswax-pellets.png";
import beePollen from "@/assets/prod-bee-pollen.png";
import beeswaxCandles from "@/assets/prod-beeswax-candles.png";
import beautyProducts from "@/assets/prod-beauty.png";
import luxuryHamper from "@/assets/prod-luxury-hamper.png";

export const imageMap: Record<string, string> = {
  "ajwain-honey": ajwain,
  "prod-ajwain": ajwain,
  "fennel-honey": fennel,
  "prod-fennel": fennel,
  "lychee-honey": lychee,
  "prod-lychee": lychee,
  "multiflora-honey": multiflora,
  "prod-multiflora": multiflora,
  "raw-honey-squeeze": squeeze,
  "prod-squeeze": squeeze,
  "honey-comb": honeycomb,
  "prod-honeycomb": honeycomb,
  "premium-gift-pack": giftpack,
  "family-gift-pack": giftpack,
  "prod-giftpack": giftpack,
  "hero-honey": hero,
  "bee-farm": beeFarm,
  "honey-drizzle": drizzle,
  "family-honey": family,
  "bee-flower": beeFlower,
  "prod-liquid": liquid,
  "team-beekeepers": team,
  // Add new product images
  "prod-beeswax-pellets": beeswaxPellets,
  "prod-bee-pollen": beePollen,
  "prod-beeswax-candles": beeswaxCandles,
  "prod-beauty": beautyProducts,
  "prod-luxury-hamper": luxuryHamper,
};

export const IMAGE_KEYS = Object.keys(imageMap);
export const FALLBACK_IMAGE = hero;

export function resolveProductImage(
  url: string | null | undefined,
  key: string | null | undefined,
  firstImage: string | null | undefined,
  productName: string = "product",
  updatedAt?: string | null
): string {
  // 1. Determine the best available input string
  let cleanInput = (url || key || firstImage || "").trim();

  if (!cleanInput) {
    return FALLBACK_IMAGE;
  }

  // 1.5. If the exact key exists in the local imageMap, return the local asset immediately
  if (imageMap[cleanInput]) {
    return imageMap[cleanInput];
  }

  // 2. If it's already an absolute URL to product_images, return as-is
  if (/^https?:\/\//i.test(cleanInput)) {
    // We optionally add the cache-busting timestamp
    if (updatedAt && cleanInput.includes('supabase.co')) {
      const ts = new Date(updatedAt).getTime();
      if (!isNaN(ts)) {
        const separator = cleanInput.includes('?') ? '&' : '?';
        return `${cleanInput}${separator}v=${ts}`;
      }
    }
    return cleanInput;
  }

  // 3. Clean up the path
  let path = cleanInput.replace(/^\/+/, '').split('?')[0].split('#')[0];

  // 4. Normalize to the correct bucket and path
  let bucket = "product_images";

  if (path.startsWith('media/')) {
    bucket = "media";
    path = path.substring(6);
  } else if (path.startsWith('review-media/')) {
    bucket = "review-media";
    path = path.substring(13);
  } else if (path.startsWith('product_images/')) {
    bucket = "product_images";
    path = path.substring(15);
  } else if (path.startsWith('legacy/')) {
    bucket = "product_images";
    // Keep the legacy/ prefix for the path
  } else if (!path.includes('/')) {
    // Otherwise, assume it's a migrated file that should be in legacy/
    bucket = "product_images";
    path = `legacy/${path}`;
  }

  // Generate public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  let resultUrl = data?.publicUrl || FALLBACK_IMAGE;

  // Append timestamp if applicable
  if (updatedAt && resultUrl !== FALLBACK_IMAGE && resultUrl.includes('supabase.co')) {
    const ts = new Date(updatedAt).getTime();
    if (!isNaN(ts)) {
      const separator = resultUrl.includes('?') ? '&' : '?';
      resultUrl += `${separator}v=${ts}`;
    }
  }

  return resultUrl;
}

// Keep resolveImage for non-product cases (like categories) but point it to resolveProductImage if applicable
export function resolveImage(
  key: string | null | undefined,
  url: string | null | undefined,
  fallback: string = FALLBACK_IMAGE,
  updatedAt?: string | null,
): string {
  return resolveProductImage(url, key, null, "image", updatedAt);
}

/**
 * ONE CANONICAL HELPER for Category Images as requested.
 * 1. Returns null if there is no image.
 * 2. Returns category.image_url unchanged if it is already an absolute HTTPS URL.
 * 3. Converts a Storage path to the correct public URL exactly once.
 * 4. Never uses local fallback when a valid image_url exists.
 */
export function getCategoryImageUrl(category: { image_url?: string | null, slug?: string }): string | null {
  if (!category || !category.image_url) {
    return null;
  }
  
  const cleanUrl = category.image_url.trim();
  if (!cleanUrl) return null;

  // If it's already a full HTTP/HTTPS URL, return it exactly as-is.
  if (/^https?:\/\//i.test(cleanUrl)) {
    return cleanUrl;
  }

  // It's a storage path, convert it exactly once using the "media" bucket by default.
  let path = cleanUrl.replace(/^\/+/, '');
  let bucket = "media";
  
  if (path.startsWith('media/')) {
    path = path.substring(6);
  } else if (path.startsWith('legacy/')) {
    bucket = "product_images";
  } else if (path.startsWith('product_images/')) {
    bucket = "product_images";
    path = path.substring(15);
  }
  
  path = path.split('?')[0].split('#')[0]; // remove accidental query strings

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (data && data.publicUrl) {
    return data.publicUrl;
  }

  return null;
}

