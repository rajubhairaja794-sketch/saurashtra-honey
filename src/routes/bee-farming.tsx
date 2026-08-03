import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";
import { PremiumMobileCarousel } from "@/components/site/PremiumMobileCarousel";
import { StructuredData, breadcrumbLd } from "@/components/site/StructuredData";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Photographic assets matching the warm, golden, farm-origin aesthetic
import heroHoneyImg from "@/assets/hero-honey.jpg";
import beeFarmImg from "@/assets/bee-farm.jpg";
import honeycombBeesImg from "@/assets/honeycomb-bees.jpg";
import familyHoneyImg from "@/assets/family-honey.jpg";
import honeyDrizzleImg from "@/assets/honey-drizzle.jpg";
import heroProductsImg from "@/assets/hero-products.jpg";
import beeFlowerImg from "@/assets/bee-flower.jpg";

export const Route = createFileRoute("/bee-farming")({
  head: () => ({
    meta: [
      {
        title:
          "Bee Farming — Respecting Bees, Protecting Nature | Saurashtra Honey",
      },
      {
        name: "description",
        content:
          "At Saurashtra Honey Bee Farm, we practice ethical beekeeping that protects bees, enriches nature and nurtures pure honey.",
      },
      { property: "og:title", content: "Bee Farming — Saurashtra Honey" },
      {
        property: "og:description",
        content: "Bee Farming With Care. For a Better Tomorrow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BeeFarming,
});

function BeeFarming() {
  const approachCards = [
    {
      title: "Natural Habitat",
      desc: "Our bees thrive in clean, lush environments far from pollution.",
      img: beeFarmImg,
      Icon: Leaf,
    },
    {
      title: "Healthy Bees",
      desc: "We ensure strong, disease-free colonies through natural care.",
      img: beeFlowerImg,
      Icon: Sparkles,
    },
    {
      title: "Ethical Practices",
      desc: "We follow sustainable methods that protect bees and nature.",
      img: familyHoneyImg,
      Icon: HeartHandshake,
    },
  ];

  const processSteps = [
    {
      num: 1,
      title: "Flowers Bloom",
      desc: "Bees collect nectar from wildflowers and plants.",
      img: beeFarmImg,
    },
    {
      num: 2,
      title: "Bees Collect Nectar",
      desc: "Bees gather nectar and store it in honeycombs.",
      img: beeFlowerImg,
    },
    {
      num: 3,
      title: "Nectar is Converted",
      desc: "Bees naturally convert nectar into pure honey.",
      img: honeycombBeesImg,
    },
    {
      num: 4,
      title: "Careful Harvesting",
      desc: "We harvest honey with care, without harming the bees.",
      img: familyHoneyImg,
    },
    {
      num: 5,
      title: "Cold Extraction",
      desc: "Honey is extracted at low temperatures to retain nutrients.",
      img: honeyDrizzleImg,
    },
    {
      num: 6,
      title: "Pure Honey to You",
      desc: "Lab-tested, packed with care and delivered to your home.",
      img: heroProductsImg,
    },
  ];

  const whyBeesPoints = [
    "1/3 of the food we eat is pollinated by bees.",
    "Bees help plants, fruits and seeds grow.",
    "A healthy bee population means a healthy planet.",
  ];

  return (
    <SiteLayout>
      <StructuredData
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Bee Farming", url: "/bee-farming" },
        ])}
      />

      {/* =========================================================================
          2. BEE FARMING HERO (Left: Eyebrow + Serif Heading + Orange Italics + CTA, Right: Beekeeper Photo)
         ========================================================================= */}
      <PageHeroSlider page="bee-farming" />

      {/* =========================================================================
          3. OUR APPROACH TO BEE FARMING (#our-approach, Asymmetric 12-Column Grid)
         ========================================================================= */}
      <section
        id="our-approach"
        className="py-16 sm:py-24 bg-cream border-b border-border/80"
      >
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column (4 columns) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2">
                  OUR APPROACH
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight">
                  Our Approach to
                  <br />
                  Bee Farming
                </h2>
              </div>

              <p className="text-sm sm:text-base text-espresso/80 leading-relaxed">
                We believe in ethical beekeeping that works in harmony with
                nature. Our bees are cared for with respect, without harming
                their colonies or the environment.
              </p>

              <ul className="space-y-3 pt-1">
                {[
                  "We do not over-harvest honey.",
                  "We ensure healthy colonies and natural habitats.",
                  "We support pollination and biodiversity.",
                  "We follow seasonal harvesting for best quality.",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-[15px] font-semibold text-espresso">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right 3 Photographic Cards Column (8 columns) */}
            <div className="lg:col-span-8">
              {/* Mobile View */}
              <div className="block sm:hidden mt-4">
                <PremiumMobileCarousel
                  items={approachCards}
                  slideClassName="flex-[0_0_86vw] min-w-0"
                  renderItem={({ title, desc, img, Icon }) => (
                    <div className="flex flex-col items-center rounded-[22px] overflow-hidden bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 text-center pb-6 h-full">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-cream-deep relative">
                        <img
                          src={img}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center pointer-events-none"
                        />
                      </div>
                      <div className="size-12 rounded-full bg-cream border border-border text-brand-orange shadow-sm flex items-center justify-center -mt-6 relative z-10 mx-auto">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-serif text-[18px] font-bold text-espresso mt-2 px-3">
                        {title}
                      </h3>
                      <p className="text-[14px] text-espresso/75 leading-relaxed mt-1 px-4">
                        {desc}
                      </p>
                    </div>
                  )}
                />
              </div>

              {/* Desktop/Tablet View */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-6">
                {approachCards.map(({ title, desc, img, Icon }, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center rounded-3xl overflow-hidden bg-cream border border-border/80 shadow-xs hover:shadow-lift transition-all duration-300 text-center pb-6 group"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-cream-deep relative">
                      <img
                        src={img}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="size-12 rounded-full bg-cream border border-border text-brand-orange shadow-sm flex items-center justify-center -mt-6 relative z-10 mx-auto">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-espresso mt-2 px-3">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed mt-1 px-4">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. OUR BEE FARMING PROCESS SECTION (Premium Visual Storytelling)
         ========================================================================= */}
      <section className="py-20 sm:py-32 bg-[#FDFBF7] border-b border-border/60 overflow-hidden">
        <div className="container-page">
          <div className="text-center max-w-[700px] mx-auto mb-16 sm:mb-24">
            <div className="text-[12px] font-bold tracking-[0.25em] uppercase text-[#D97706] mb-4">
              OUR BEE FARMING PROCESS
            </div>
            <h2 className="font-serif text-[34px] sm:text-[44px] md:text-[56px] font-[500] text-[#2B2118] tracking-tight leading-[1.1] mb-6">
              From Flower to Honey – The Natural Way
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#6B6257] leading-[1.7] max-w-[650px] mx-auto">
              Follow the remarkable journey of pure honey—from wildflowers and hardworking bees to careful harvesting and gentle extraction—crafted by nature and preserved with care.
            </p>
          </div>
        </div>

        <BeeFarmingProcessCarousel steps={processSteps} />
      </section>

      {/* =========================================================================
          6. WHY BEES MATTER & LARGE FARM / APIARY VISUAL
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-orange mb-2">
                  WHY BEES MATTER
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight inline-flex items-center gap-3">
                  <span>
                    Small Bees.
                    <br />
                    Big Impact.
                  </span>
                  <span className="text-2xl sm:text-3xl">🐝</span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-espresso/80 leading-relaxed">
                Bees play a vital role in pollination, supporting food
                production and maintaining the balance of our ecosystem.
              </p>

              <ul className="space-y-3.5 pt-1">
                {whyBeesPoints.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-[15px] font-semibold text-espresso">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Immersive Apiary / Farm Photo Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-lift border border-border/80 bg-cream-deep aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={beeFarmImg}
                  alt="Saurashtra Honey — Natural Bee Farm & Apiary Boxes"
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

function BeeFarmingProcessCarousel({ steps }: { steps: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 60, // Smooth 600ms transition
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3000, // 3 seconds
        stopOnInteraction: true,
        playOnInit: false,
      }),
    ]
  );

  // Resume autoplay logic after 5 seconds of no interaction
  React.useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    const initTimeout = setTimeout(() => {
      autoplay.play();
    }, 3000);

    const resumeAutoplay = () => {
      autoplay.play();
    };

    let timeoutId: NodeJS.Timeout;
    const onInteract = () => {
      autoplay.stop();
      clearTimeout(timeoutId);
      clearTimeout(initTimeout);
      timeoutId = setTimeout(resumeAutoplay, 5000);
    };

    emblaApi.on("pointerDown", onInteract);
    emblaApi.on("pointerUp", onInteract);

    return () => {
      emblaApi.off("pointerDown", onInteract);
      emblaApi.off("pointerUp", onInteract);
      clearTimeout(timeoutId);
      clearTimeout(initTimeout);
    };
  }, [emblaApi]);

  return (
    <div
      className="overflow-hidden w-full pl-4 sm:pl-8 md:pl-12 lg:pl-[max(2rem,calc((100vw-1200px)/2))] pb-12"
      ref={emblaRef}
    >
      <div
        className="flex touch-pan-y cursor-grab active:cursor-grabbing pb-6"
        style={{ marginLeft: "-24px" }}
      >
        {steps.map(({ num, title, desc, img }, idx) => (
          <div 
            key={idx} 
            className="flex-[0_0_90vw] md:flex-[0_0_380px] xl:flex-[0_0_480px] min-w-0 pl-[24px]"
          >
            <div
              className="flex flex-col rounded-[24px] overflow-hidden bg-white border border-[#D97706]/15 shadow-[0_4px_24px_rgba(43,33,24,0.04)] hover:shadow-[0_16px_40px_rgba(43,33,24,0.08)] transition-all duration-500 relative group animate-in fade-in slide-in-from-bottom-8 fill-mode-both hover:-translate-y-2 h-[480px] md:h-[520px] xl:h-[580px]"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* 82% Image Area */}
              <div className="h-[82%] w-full overflow-hidden bg-[#F8F5EF] relative">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* 18% Content Area */}
              <div className="h-[18%] px-5 sm:px-6 flex flex-col justify-center text-center bg-white relative z-0">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#D97706] mb-0.5">
                  Step {num}
                </div>
                <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#2B2118] mb-1 line-clamp-1">
                  {title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#6B6257] leading-[1.6] line-clamp-2">
                  {desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
