import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  HeartHandshake,
  Award,
  FlaskConical,
  ArrowRight,
  Star,
  CheckCircle2,
  Check,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PremiumMobileCarousel } from "@/components/site/PremiumMobileCarousel";
import { ProductCard } from "@/components/site/ProductCard";
import { HeroSlider, type HeroSlide } from "@/components/site/HeroSlider";
import { fetchHeroSlides, getDefaultHeroSlides } from "@/lib/hero-catalog";
import { type Product } from "@/lib/products";
import { type ShopCategory } from "@/lib/category-catalog";
import { type BlogPost } from "@/lib/blog";

// Assets
import heroHoneyImg from "@/assets/hero-honey.jpg";
import heroProductsImg from "@/assets/hero-products.jpg";
import honeyDrizzleImg from "@/assets/honey-drizzle.jpg";
import honeycombBeesImg from "@/assets/honeycomb-bees.jpg";
import beeFlowerImg from "@/assets/bee-flower.jpg";
import beeFarmImg from "@/assets/bee-farm.jpg";
import familyHoneyImg from "@/assets/family-honey.jpg";

import prodAjwainImg from "@/assets/prod-ajwain.jpg";
import prodLycheeImg from "@/assets/prod-lychee.jpg";
import prodMultifloraImg from "@/assets/prod-multiflora.jpg";
import prodHoneycombImg from "@/assets/prod-honeycomb.jpg";
import prodGiftpackImg from "@/assets/prod-giftpack.jpg";
import prodLiquidImg from "@/assets/prod-liquid.jpg";

/* =========================================================================
   1. HERO SECTION (Reference: Top Left text + CTA + Trust Badges, Right Image)
   ========================================================================= */
export function HomeHero() {
  const [slides, setSlides] = React.useState<HeroSlide[]>(() =>
    getDefaultHeroSlides("home")
  );

  React.useEffect(() => {
    void fetchHeroSlides("home").then((res) => {
      if (res && res.length > 0) setSlides(res);
    });
  }, []);

  return (
    <HeroSlider
      slides={slides}
      interval={6000}
      size="home"
      variant="home"
    />
  );
}

/* =========================================================================
   2. MAIN TRUST STRIP (Horizontal 6-card row with thin orange icons)
   ========================================================================= */
export function HomeTrustStrip() {
  const items = [
    { label: "100% Pure No Additives", Icon: ShieldCheck },
    { label: "Raw & Unprocessed", Icon: FlaskConical },
    { label: "Natural Floral Sources", Icon: Leaf },
    { label: "Rich in Nutrients", Icon: Sparkles },
    { label: "Lab Tested", Icon: Award },
    { label: "Ethical Beekeeping", Icon: HeartHandshake },
  ];

  return (
    <section className="bg-cream-deep/40 border-y border-border/80 py-8 sm:py-10">
      <div className="container-page">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {items.map(({ label, Icon }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-cream/60 transition-colors"
            >
              <div className="size-11 rounded-full bg-cream border border-border flex items-center justify-center text-brand-orange shadow-xs mb-3">
                <Icon className="size-5" />
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-espresso leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   3. SHOP BY CATEGORY (6 circular cards with images)
   ========================================================================= */
export function HomeShopByCategory() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const HOME_CATEGORIES = [
    { name: "Raw Honey", img: prodLiquidImg, filter: "raw-honey" },
    { name: "Beeswax", img: honeycombBeesImg, filter: "beeswax" },
    { name: "Bee Pollen", img: beeFlowerImg, filter: "bee-pollen" },
    { name: "Beeswax Candles", img: honeyDrizzleImg, filter: "candles" },
    { name: "Beauty & Personal Care", img: familyHoneyImg, filter: "beauty" },
    { name: "Gift Hampers", img: prodGiftpackImg, filter: "gift-hampers" },
    { name: "All Products", img: heroProductsImg, filter: "" },
  ];

  const displayCats = [...HOME_CATEGORIES, ...HOME_CATEGORIES, ...HOME_CATEGORIES];

  return (
    <section className="pt-24 pb-20 bg-[#F8F5EF] overflow-hidden">
      <div className="container-page mb-14">
        <div className="flex flex-col items-center text-center">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            DISCOVER
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]">
            Explore Our World
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]">
            Discover every expression of pure honey—from everyday favourites to rare treasures, thoughtfully crafted by nature.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group"
          >
            <span>VIEW ALL CATEGORIES</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
          </Link>
        </div>
      </div>

      <div className="w-full max-w-[1696px] mx-auto relative group px-4">
        {/* Mobile View (Premium Carousel) */}
        <div className="block md:hidden">
          <PremiumMobileCarousel
            items={displayCats}
            slideClassName="flex-[0_0_86vw] min-w-0"
            renderItem={(cat) => (
              <Link
                to="/shop"
                search={cat.filter ? ({ category: cat.filter } as never) : ({ category: "All Products" } as never)}
                className="group relative flex flex-col shrink-0 overflow-hidden bg-white rounded-[22px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.15)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-full aspect-[16/21] hover:scale-[1.03]"
              >
                <div className="h-[82%] w-full overflow-hidden bg-[#F8F5EF]/50">
                  <img 
                    src={cat.img} 
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] pointer-events-none"
                  />
                </div>
                <div className="h-[18%] w-full bg-white flex items-center justify-center p-2">
                  <h3 className="font-serif text-[18px] text-[#2B2118] font-medium transition-colors duration-[400ms] ease-out group-hover:text-[#D97706] text-center">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            )}
          />
        </div>

        {/* Desktop View (Original Embla Carousel) */}
        <div className="hidden md:block">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-8 lg:left-12 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#3B2E24] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/70"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-8 lg:right-12 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#3B2E24] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/70"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex gap-[24px] py-6 touch-pan-y cursor-grab active:cursor-grabbing">
              {displayCats.map((cat, idx) => (
              <div 
                key={idx} 
                className="flex-[0_0_48%] md:flex-[0_0_31%] lg:flex-[0_0_23%] xl:flex-[0_0_18.5%] min-w-0"
              >
                <Link
                  to="/shop"
                  search={cat.filter ? ({ category: cat.filter } as never) : ({ category: "All Products" } as never)}
                  className="group relative flex flex-col shrink-0 overflow-hidden bg-white rounded-[22px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.15)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-full aspect-[16/21] hover:scale-[1.03]"
                >
                  {/* Image Section (82%) */}
                  <div className="h-[82%] w-full overflow-hidden bg-[#F8F5EF]/50">
                    <img 
                      src={cat.img} 
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transform transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] pointer-events-none"
                    />
                  </div>
                  
                  {/* Text Section (18%) */}
                  <div className="h-[18%] w-full bg-white flex items-center justify-center p-2">
                    <h3 className="font-serif text-[18px] text-[#2B2118] font-medium transition-colors duration-[400ms] ease-out group-hover:text-[#D97706] text-center">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. BEST SELLERS (4 or 5 horizontal cards using ProductCard)
   ========================================================================= */
export function HomeBestSellers({
  products,
  onQuickView,
}: {
  products: Product[];
  onQuickView?: (p: Product) => void;
}) {
  const bestSellers = products
    .filter((p) => p.badge === "BESTSELLER" || (p.reviews || 0) > 200)
    .slice(0, 4);

  const displayList =
    bestSellers.length >= 4 ? bestSellers : products.slice(0, 4);

  return (
    <section className="pt-[100px] pb-14 sm:pb-20 bg-cream-deep/30 border-y border-border/60">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-[70px]">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            CURATED FOR YOU
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]">
            Our Finest Picks
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]">
            A handpicked selection of our most loved honey and bee-crafted essentials, chosen for their exceptional purity and quality.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
          </Link>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden mt-2">
          <PremiumMobileCarousel
            items={displayList}
            slideClassName="flex-[0_0_86vw] min-w-0"
            renderItem={(product) => (
              <ProductCard p={product} onQuickView={onQuickView} />
            )}
          />
        </div>

        {/* Desktop/Tablet View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayList.map((product) => (
            <ProductCard
              key={product.slug}
              p={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


/* =========================================================================
   6. WHY CHOOSE SAURASHTRA HONEY (Asymmetrical editorial 3-column layout)
   ========================================================================= */
export function HomeWhyChoose() {
  const benefits = [
    "Pure & Unadulterated Honey",
    "Ethically Sourced & Sustainably Harvested",
    "Lab Tested for Moisture, HMF & Purity",
    "No Artificial Flavours or Preservatives",
  ];

  return (
    <section id="why-saurashtra-honey" className="py-16 sm:py-24 bg-cream">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-[70px]">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            OUR HERITAGE
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]">
            Where Purity Begins
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]">
            Every drop reflects generations of beekeeping, sustainable farming, and an unwavering commitment to quality.
          </p>
          <Link
            to="/our-story"
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group"
          >
            <span>KNOW MORE ABOUT US</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
          </Link>
        </div>

        {/* Mobile View: Text First, Images Below */}
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="p-8 rounded-[24px] bg-white border border-[#2B2118]/10 space-y-4 shadow-sm text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-[#D97706]/10 text-[#D97706] mb-2">
              <Sparkles className="size-6" />
            </div>
            <h3 className="font-serif text-[26px] font-medium text-[#2B2118] leading-tight">
              Naturally Sweet.
              <br />
              Truly Wholesome.
            </h3>
            <p className="text-[15px] text-[#6B6257] leading-relaxed px-2">
              Experience the authentic aroma and floral notes of honey
              straight from the comb. No processing, no overheating—just 100%
              natural goodness.
            </p>
          </div>

          <div className="px-2">
            <ul className="space-y-4">
              {benefits.map((text, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white/50 p-4 rounded-[16px] border border-[#2B2118]/5 shadow-sm">
                  <CheckCircle2 className="size-[22px] text-[#D97706] shrink-0 mt-[2px]" />
                  <span className="text-[15px] font-medium text-[#2B2118]">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2 px-2">
            <div className="rounded-[24px] overflow-hidden aspect-[4/5] shadow-sm">
              <img
                src={honeyDrizzleImg}
                alt="Raw honey pouring"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-[24px] overflow-hidden aspect-[4/5] shadow-sm">
              <img
                src={beeFlowerImg}
                alt="Honey bee collecting nectar"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-stretch">
          {/* Left Col (4 cols) */}
          <div className="col-span-4 flex flex-col justify-center space-y-6">
            <ul className="space-y-3.5 pt-1">
              {benefits.map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-[15px] font-semibold text-espresso">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Col (4 cols): Tall honey-drizzle photo card */}
          <div className="col-span-4">
            <div className="h-full rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep min-h-[340px] sm:min-h-[440px]">
              <img
                src={honeyDrizzleImg}
                alt="Raw honey pouring"
                loading="lazy"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Right Col (4 cols): Top card + bottom bee-flower photo */}
          <div className="col-span-4 flex flex-col justify-between gap-8">
            <div className="p-8 rounded-3xl bg-cream-deep/60 border border-border/80 space-y-4">
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-brand-orange/15 text-brand-orange">
                <Sparkles className="size-6" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso leading-snug">
                Naturally Sweet.
                <br />
                Truly Wholesome.
              </h3>
              <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed">
                Experience the authentic aroma and floral notes of honey
                straight from the comb. No processing, no overheating—just 100%
                natural goodness.
              </p>
            </div>

            <div className="flex-1 rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep min-h-[220px]">
              <img
                src={beeFlowerImg}
                alt="Honey bee collecting nectar from wild flora"
                loading="lazy"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   7. FARM / BEEKEEPING BANNER (Wide dark-overlay banner)
   ========================================================================= */
export function HomeFarmBanner() {
  return (
    <section className="relative overflow-hidden my-6 sm:my-10 bg-espresso text-white">
      <div className="absolute inset-0 z-0">
        <img
          src={beeFarmImg}
          alt="Saurashtra Beekeeping farm"
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/80 to-espresso/60" />
      </div>

      <div className="relative z-10 container-page py-16 sm:py-24">
        <div className="flex flex-col items-center text-center max-w-none mb-[70px]">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            BEEKEEPING
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#FFF9ED] leading-tight mb-[20px]">
            The Art of Beekeeping
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#FFF9ED]/80 max-w-[700px] leading-[1.7] mb-[36px]">
            A closer look at the people, passion, and practices that make our honey naturally exceptional.
          </p>
          <Link
            to="/bee-farming"
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group"
          >
            <span>LEARN ABOUT OUR FARMS</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   8. STATISTICS STRIP (5 items horizontal grid below farm banner)
   ========================================================================= */
export function HomeStatsStrip() {
  const stats = [
    { value: "15+ Years", label: "Beekeeping Experience" },
    { value: "2000+", label: "Happy Customers Across India" },
    { value: "500+", label: "Bee Boxes Under Care" },
    { value: "100%", label: "Lab Tested For Purity" },
    { value: "0%", label: "Additives Always Pure" },
  ];

  return (
    <section className="bg-cream-deep/50 border-b border-border/80 py-10 sm:py-12">
      <div className="container-page">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {stats.map(({ value, label }, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-cream/70 border border-border/60 shadow-xs"
            >
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-orange">
                {value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-espresso/80 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   9. TESTIMONIALS (3 horizontal customer review cards with round avatars)
   ========================================================================= */
export function HomeTestimonials({
  reviews,
}: {
  reviews?: {
    id: string;
    author_name: string;
    content: string;
    rating: number;
    location?: string;
  }[];
}) {
  const fallbackTestimonials = [
    {
      id: "t1",
      author_name: "Neha Shah",
      location: "Ahmedabad, Gujarat",
      content:
        "The Ajwain flora honey is incredible. You can actually smell and taste the difference from commercial store brands. My family loves it!",
      rating: 5,
      avatar: familyHoneyImg,
    },
    {
      id: "t2",
      author_name: "Karan Mehta",
      location: "Rajkot, Gujarat",
      content:
        "Finally found an authentic raw honey brand from Gujarat. Every bottle comes with NABL test purity reports. Super trustworthy!",
      rating: 5,
      avatar: honeyDrizzleImg,
    },
    {
      id: "t3",
      author_name: "Ritika Verma",
      location: "Surat, Gujarat",
      content:
        "The raw honeycomb was a hit with my kids! Truly unfiltered, natural sweetness without any artificial aftertaste.",
      rating: 5,
      avatar: beeFlowerImg,
    },
  ];

  const items =
    reviews && reviews.length >= 3
      ? reviews.slice(0, 3).map((r, i) => ({
          id: r.id,
          author_name: r.author_name,
          location: r.location || "Gujarat, India",
          content: r.content,
          rating: r.rating || 5,
          avatar: fallbackTestimonials[i % fallbackTestimonials.length]?.avatar,
        }))
      : fallbackTestimonials;

  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-[70px]">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            TRUSTED BY MANY
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]">
            Loved Across India
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7]">
            Real experiences shared by customers who choose purity every day.
          </p>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden mt-2">
          <PremiumMobileCarousel
            items={items}
            slideClassName="flex-[0_0_86vw] min-w-0"
            renderItem={(item) => (
              <div className="flex flex-col justify-between p-7 rounded-[22px] bg-white border border-border/80 shadow-[0_12px_30px_rgba(0,0,0,0.06)] h-full">
                <div>
                  <div
                    className="flex items-center gap-1 text-brand-orange mb-4"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="size-4 fill-brand-orange text-brand-orange"
                      />
                    ))}
                  </div>

                  <blockquote className="text-[14px] text-espresso/90 leading-relaxed italic mb-6">
                    &ldquo;{item.content}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-border/60">
                  <div className="size-12 rounded-full overflow-hidden border-2 border-brand-orange/40 shrink-0 bg-cream">
                    <img
                      src={item.avatar}
                      alt={item.author_name}
                      loading="lazy"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-[14px] text-espresso">
                      {item.author_name}
                    </div>
                    <div className="text-[12px] text-muted-foreground">
                      {item.location}
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </div>

        {/* Desktop/Tablet View */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-cream-deep/40 border border-border/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div
                  className="flex items-center gap-1 text-brand-orange mb-4"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="size-4 fill-brand-orange text-brand-orange"
                    />
                  ))}
                </div>

                <blockquote className="text-sm sm:text-base text-espresso/90 leading-relaxed italic mb-6">
                  &ldquo;{item.content}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-border/60">
                <div className="size-12 rounded-full overflow-hidden border-2 border-brand-orange/40 shrink-0 bg-cream">
                  <img
                    src={item.avatar}
                    alt={item.author_name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-espresso">
                    {item.author_name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   10. JOURNAL PREVIEW (3 article cards from blogPosts)
   ========================================================================= */
export function HomeJournalPreview({ posts }: { posts: BlogPost[] }) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-cream-deep/25 border-t border-border/80">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-[70px]">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            JOIN OUR JOURNEY
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]">
            Follow Our Hive
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]">
            Stay connected for new harvests, behind-the-scenes moments, and everyday inspiration from our farms.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group"
          >
            <span>READ OUR STORIES</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
          </Link>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden mt-2">
          <PremiumMobileCarousel
            items={displayPosts}
            slideClassName="flex-[0_0_86vw] min-w-0"
            renderItem={(post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-[22px] overflow-hidden bg-white border border-border/80 shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full"
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="block overflow-hidden aspect-[16/10]"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2.5">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-[18px] font-bold leading-snug text-espresso">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest text-brand-orange hover:text-[#B46204] transition-colors"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            )}
          />
        </div>

        {/* Desktop/Tablet View */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
          {displayPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-3xl overflow-hidden bg-cream border border-border/80 shadow-xs hover:shadow-lift transition-all duration-300"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block overflow-hidden aspect-[16/10]"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2.5">
                  <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-orange">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-espresso group-hover:text-brand-orange transition-colors">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/75 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-brand-orange hover:text-[#B46204] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
