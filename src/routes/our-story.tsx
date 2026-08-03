import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useCallback } from "react";
import { PremiumMobileCarousel } from "@/components/site/PremiumMobileCarousel";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  HeartHandshake,
  Users,
  Globe,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";
import { StructuredData, breadcrumbLd, organizationLd } from "@/components/site/StructuredData";

// Assets matching the Our Story photographic language
import heroHoneyImg from "@/assets/hero-honey.jpg";
import beeFarmImg from "@/assets/bee-farm.jpg";
import honeycombBeesImg from "@/assets/honeycomb-bees.jpg";
import familyHoneyImg from "@/assets/family-honey.jpg";
import honeyDrizzleImg from "@/assets/honey-drizzle.jpg";
import heroProductsImg from "@/assets/hero-products.jpg";
import beeFlowerImg from "@/assets/bee-flower.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      {
        title:
          "Our Story — Rooted in Nature, Driven by Purpose | Saurashtra Honey",
      },
      {
        name: "description",
        content:
          "From the heart of Saurashtra to your home, our journey is one of passion, purity and purpose. Discover our ethical beekeeping and natural farms.",
      },
      { property: "og:title", content: "Our Story — Saurashtra Honey" },
      {
        property: "og:description",
        content: "Rooted in Nature, Driven by Purpose.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurStory,
});

function OurStory() {
  const values = [
    {
      title: "Purity",
      desc: "No shortcuts. Just 100% pure honey.",
      Icon: Leaf,
    },
    {
      title: "Sustainability",
      desc: "We protect bees today for a better tomorrow.",
      Icon: Sparkles,
    },
    {
      title: "Trust",
      desc: "Lab-tested and family-approved.",
      Icon: HeartHandshake,
    },
    {
      title: "Community",
      desc: "Empowering beekeepers and rural communities.",
      Icon: Users,
    },
    {
      title: "Responsibility",
      desc: "Ethical practices for a healthier planet.",
      Icon: Globe,
    },
  ];

  const processSteps = [
    {
      step: "1. Natural Beekeeping",
      desc: "We care for bees using ethical and natural methods.",
      img: beeFarmImg,
    },
    {
      step: "2. Healthy Colonies",
      desc: "Strong bees, healthy hives and rich floral sources.",
      img: honeycombBeesImg,
    },
    {
      step: "3. Hand Harvested",
      desc: "Honey is harvested with care, preserving its purity.",
      img: familyHoneyImg,
    },
    {
      step: "4. Cold Extracted",
      desc: "Extracted at low temperature to retain nutrients.",
      img: honeyDrizzleImg,
    },
    {
      step: "5. Lab Tested & Packed",
      desc: "Every batch is tested for purity and packed with love.",
      img: heroProductsImg,
    },
  ];

  const benefits = [
    "Pure & Unadulterated Honey",
    "Ethically Sourced & Sustainably Harvested",
    "Lab Tested for Moisture, HMF & Purity",
    "No Artificial Flavours or Preservatives",
  ];

  return (
    <SiteLayout>
      <StructuredData data={organizationLd()} />
      <StructuredData
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Our Story", url: "/our-story" },
        ])}
      />

      {/* =========================================================================
          2. OUR STORY HERO (Left: Eyebrow + Black Serif + Orange Italics + CTA, Right: Beekeeper Photo)
         ========================================================================= */}
      <PageHeroSlider page="our-story" />

      {/* =========================================================================
          3. OUR JOURNEY SECTION (#our-journey, 2-column editorial layout)
         ========================================================================= */}
      <section
        id="our-journey"
        className="py-14 md:py-20 lg:py-24 bg-cream border-b border-border/80"
      >
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
            {/* Left Story Content Column */}
            <div className="lg:col-span-6 space-y-5 md:space-y-6">
              <div>
                <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2">
                  OUR JOURNEY
                </div>
                <h2 className="font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso">
                  A Journey That
                  <br />
                  Began with a Dream
                </h2>
              </div>

              <div className="space-y-4 text-[16px] md:text-lg text-espresso/80 leading-relaxed">
                <p>
                  Saurashtra Honey Bee Farm was born out of a deep love for
                  nature and a vision to bring pure, unadulterated honey to
                  every household. What started as a small beekeeping passion
                  has today grown into a trusted brand that thousands of
                  families rely on.
                </p>
                <p>
                  We believe in working with nature, not against it. Every drop
                  of honey we produce is a result of care, patience and respect
                  for bees.
                </p>
              </div>
            </div>

            {/* Right Large Farm / Apiary Image Column */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src={beeFarmImg}
                  alt="Saurashtra Honey Bee Farm Apiary"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. OUR VALUES SECTION (5 clean minimal cards with orange line icons)
         ========================================================================= */}
      <section className="py-14 md:py-20 lg:py-24 bg-cream border-b border-border/80">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 lg:mb-16">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2">
              OUR VALUES
            </div>
            <h2 className="font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
              The Values That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {values.map(({ title, desc, Icon }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-cream-deep/50 transition-colors"
              >
                <div className="size-16 sm:size-20 rounded-full bg-cream border border-border flex items-center justify-center text-brand-orange shadow-xs mb-4">
                  <Icon className="size-7 sm:size-8" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-espresso">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed mt-1.5 max-w-[180px]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. OUR BEEKEEPING PROCESS SECTION (5 step cards with photo & orange connectors)
         ========================================================================= */}
      <section className="py-14 md:py-20 lg:py-24 bg-cream border-b border-border/80">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 lg:mb-16">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2">
              OUR BEEKEEPING PROCESS
            </div>
            <h2 className="font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
              From Our Farm to Your Table
            </h2>
          </div>

          {/* Premium Mobile Carousel (hidden on md+) */}
          <div className="block md:hidden mt-2">
            <PremiumMobileCarousel
              items={processSteps}
              slideClassName="flex-[0_0_86vw] sm:flex-[0_0_55vw]"
              renderItem={({ step, desc, img }) => (
                <div className="flex flex-col h-full rounded-[22px] overflow-hidden bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)] relative">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F8F5EF]/50">
                    <img
                      src={img}
                      alt={step}
                      loading="lazy"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 bg-white">
                    <h3 className="font-serif text-[18px] font-bold text-[#2B2118]">
                      {step}
                    </h3>
                    <p className="text-[14px] text-[#6B6257] leading-relaxed mt-2">
                      {desc}
                    </p>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Desktop/Tablet Grid (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 items-start relative">
            {processSteps.map(({ step, desc, img }, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-2xl overflow-hidden bg-cream border border-border/80 shadow-xs hover:shadow-lift transition-all duration-300 relative group h-full"
              >
                <div className="aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-cream-deep">
                  <img
                    src={img}
                    alt={step}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-espresso group-hover:text-brand-orange transition-colors">
                      {step}
                    </h3>
                    <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed mt-1.5">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. WHY CHOOSE US SECTION (3-column asymmetric editorial layout)
         ========================================================================= */}
      <section className="py-14 md:py-20 lg:py-24 bg-cream">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-10 md:gap-10 items-stretch">
            {/* Left Col (4 cols on lg, 2 on md and mobile) */}
            <div className="col-span-2 lg:col-span-4 flex flex-col justify-center space-y-5 md:space-y-6">
              <div>
                <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2">
                  WHY CHOOSE US
                </div>
                <h2 className="font-serif text-[34px] leading-[1.15] md:text-4xl lg:text-5xl font-bold text-espresso">
                  Naturally Sweet.
                  <br />
                  Truly Wholesome.
                </h2>
              </div>

              <p className="text-[16px] md:text-lg text-espresso/80 leading-relaxed">
                Our honey is more than just a sweetener — it&apos;s nature&apos;s
                gift in its purest form.
              </p>

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

              <div className="pt-2 self-start">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  <span>KNOW MORE ABOUT US</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Center Col (4 cols): Tall honey-drizzle photo card */}
            <div className="col-span-1 lg:col-span-4">
              <div className="h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-square md:aspect-auto md:min-h-[440px]">
                <img
                  src={honeyDrizzleImg}
                  alt="Raw honey pouring"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Right Col (4 cols): Bee-flower photo card */}
            <div className="col-span-1 lg:col-span-4">
              <div className="h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-square md:aspect-auto md:min-h-[440px]">
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
    </SiteLayout>
  );
}
