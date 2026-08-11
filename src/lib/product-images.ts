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
  // Add new product images mapped from products.json
  "prod-beeswax-pellets": beeswaxPellets,
  "prod-bee-pollen": beePollen,
  "prod-beeswax-candles": beeswaxCandles,
  "prod-beauty": beautyProducts,
  "prod-luxury-hamper": luxuryHamper,
};

export const IMAGE_KEYS = Object.keys(imageMap);
export const FALLBACK_IMAGE = hero;

export function resolveImage(
  key: string | null | undefined,
  url: string | null | undefined,
  fallback: string = FALLBACK_IMAGE,
): string {
  let cleanUrl = url?.trim();
  if (cleanUrl) {
    if (cleanUrl.includes('lxdkcqdkfuuqjudsysrr.supabase.co') || cleanUrl.includes('/media/')) {
       const parts = cleanUrl.split('/media/');
       let path = parts[parts.length - 1];
       path = path.split('?')[0].split('#')[0];
       if (path.includes('supabase.co')) {
           const pathParts = path.split('/');
           path = "hero/" + pathParts[pathParts.length - 1];
       }
       return `https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/${path}`;
    }
    
    if (/^https?:\/\//i.test(cleanUrl)) {
      return cleanUrl;
    }
    return `https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/${cleanUrl.replace(/^\//, '')}`;
  }
  if (key && imageMap[key]) return imageMap[key];
  return fallback;
}
