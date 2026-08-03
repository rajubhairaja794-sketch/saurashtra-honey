import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { QuickView } from "@/components/site/QuickView";
import { ShoppableVideoCarousel } from "@/components/site/ShoppableVideoCarousel";
import { products, type Product } from "@/lib/products";
import { fetchProducts } from "@/lib/product-catalog";
import { fetchShopCategories, DEFAULT_SHOP_CATEGORIES, type ShopCategory } from "@/lib/category-catalog";
import { blogPosts, type BlogPost } from "@/lib/blog";
import { supabase } from "@/integrations/supabase/client";
import { StructuredData, breadcrumbLd, organizationLd } from "@/components/site/StructuredData";
import {
  HomeHero,
  HomeTrustStrip,
  HomeShopByCategory,
  HomeBestSellers,
  HomeWhyChoose,
  HomeFarmBanner,
  HomeStatsStrip,
  HomeTestimonials,
  HomeJournalPreview,
} from "@/components/site/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saurashtra Honey — Pure, Raw & Unfiltered Honey from Saurashtra" },
      { name: "description", content: "Raw, unfiltered honey straight from the floral farms of Saurashtra. Lab-tested for purity in every batch, ethically harvested for family wellness." },
      { property: "og:title", content: "Saurashtra Honey — Pure Honey. Proven Purity." },
      { property: "og:description", content: "Raw. Natural. Unfiltered. From our farms to your home, with care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  const [list, setList] = useState<Product[]>(products);
  const [categories, setCategories] = useState<ShopCategory[]>(DEFAULT_SHOP_CATEGORIES);
  const [reviews, setReviews] = useState<{ id: string; author_name: string; content: string; rating: number; location?: string }[]>([]);

  useEffect(() => {
    void fetchProducts().then((r) => {
      if (r.length > 0) setList(r);
    });
    void fetchShopCategories().then((r) => {
      if (r.length > 0) setCategories(r);
    });

    // Fetch live product reviews for testimonials if available
    void supabase
      .from("reviews")
      .select("id, author_name, content, rating, location")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data && data.length >= 3) {
          setReviews(data as any);
        }
      });
  }, []);

  return (
    <SiteLayout>
      <StructuredData data={organizationLd()} />
      <StructuredData data={breadcrumbLd([{ name: "Home", url: "/" }])} />

      {/* 1. HERO SECTION */}
      <HomeHero />

      {/* 2. MAIN TRUST STRIP */}
      <HomeTrustStrip />

      {/* 3. SHOP BY CATEGORY */}
      <HomeShopByCategory />

      {/* 4. BEST SELLERS */}
      <HomeBestSellers products={list} onQuickView={setQuick} />

      {/* 5. OUR SIGNATURE COLLECTION (Video Story Cards) */}
      <ShoppableVideoCarousel placementContext="homepage" />

      {/* 6. WHY CHOOSE SAURASHTRA HONEY */}
      <HomeWhyChoose />

      {/* 7. FARM / BEEKEEPING BANNER */}
      <HomeFarmBanner />

      {/* 8. STATISTICS STRIP */}
      <HomeStatsStrip />

      {/* 9. TESTIMONIALS */}
      <HomeTestimonials reviews={reviews} />

      {/* 10. JOURNAL PREVIEW */}
      <HomeJournalPreview posts={blogPosts} />

      {/* QUICK VIEW MODAL */}
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </SiteLayout>
  );
}
