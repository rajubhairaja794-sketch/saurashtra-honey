import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
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
        title: "Our Story — Rooted in Nature, Driven by Purpose | Saurashtra Honey",
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

const HERO_SLIDES = [
  {
    image: beeFarmImg,
    eyebrow: "OUR STORY",
    heading: "Every Jar Begins With a Story.",
    description: "From the landscapes of Saurashtra to your home, discover the journey behind Saurashtra Honey.",
    cta: "DISCOVER OUR STORY",
    hash: "#the-beginning"
  },
  {
    image: beeFlowerImg,
    eyebrow: "OUR BEES",
    heading: "Where Every Drop Begins.",
    description: "Healthy bees, diverse flora and a natural environment are at the heart of our honey.",
    cta: "MEET OUR BEES",
    hash: "#our-bees"
  },
  {
    image: familyHoneyImg,
    eyebrow: "OUR BEE FARM",
    heading: "In Harmony With Nature.",
    description: "Responsible beekeeping built around care for our bees, our land and the natural ecosystem.",
    cta: "EXPLORE OUR FARM",
    hash: "#responsible-beekeeping"
  },
  {
    image: honeyDrizzleImg,
    eyebrow: "FROM HIVE TO HONEY",
    heading: "Nature, Carefully Harvested.",
    description: "Follow the journey from blooming flowers and nectar to the honey in every jar.",
    cta: "SEE THE JOURNEY",
    hash: "#from-hive-to-honey"
  }
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchEndX.current - touchStartX.current > 50) prevSlide();
  };

  const handleScrollTo = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    const el = document.getElementById(hash.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden bg-[#1A120A]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {HERO_SLIDES.map((slide, i) => (
        <div 
          key={i} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
        >
          <img 
            src={slide.image} 
            alt={slide.heading} 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to ensure text readability without darkening the whole image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A120A]/70 via-[#1A120A]/30 to-transparent mix-blend-multiply" />
          
          <div className="absolute inset-0 container-page flex flex-col justify-center text-cream px-4 lg:px-8">
            <div className="max-w-[550px] text-left">
              <span className={`block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand-orange mb-4 transition-all duration-1000 delay-100 ${i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {slide.eyebrow}
              </span>
              <h1 className={`font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 transition-all duration-1000 delay-200 ${i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {slide.heading}
              </h1>
              <p className={`text-base md:text-lg text-cream/90 font-light leading-relaxed mb-8 transition-all duration-1000 delay-300 ${i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {slide.description}
              </p>
              <div className={`transition-all duration-1000 delay-400 ${i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <a href={slide.hash} onClick={(e) => handleScrollTo(e, slide.hash)} className="btn-primary inline-flex items-center gap-2">
                  {slide.cta} <ChevronRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-2 lg:left-8 flex items-center z-20 pointer-events-none hidden md:flex">
        <button onClick={prevSlide} className="size-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center pointer-events-auto transition-colors" aria-label="Previous slide">
          <ChevronLeft className="size-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-2 lg:right-8 flex items-center z-20 pointer-events-none hidden md:flex">
        <button onClick={nextSlide} className="size-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center pointer-events-auto transition-colors" aria-label="Next slide">
          <ChevronRight className="size-6" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${i === index ? 'w-8 h-1.5 bg-brand-orange' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  );
}

function OurStory() {
  // Simple fade-in animation hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8", "duration-1000", "opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-8");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <SiteLayout>
      <StructuredData items={[
        breadcrumbLd([ { name: "Home", item: "/" }, { name: "Our Story", item: "/our-story" } ]),
        organizationLd(),
      ]} />

      <main className="bg-[#F8F5EF] min-h-screen text-[#2B2118] overflow-hidden">
        
        <HeroSlider />

        {/* SECTION 1 - THE BEGINNING */}
        <section id="the-beginning" className="py-20 md:py-32 container-page">
          <div className="max-w-3xl mx-auto text-center reveal-on-scroll opacity-0 translate-y-8">
            <Leaf className="size-8 mx-auto text-brand-orange mb-6" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">The Beginning</h2>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
              Saurashtra Honey was born from a deep respect for nature and a simple belief: the best honey comes from healthy bees living in a healthy environment. Nestled in the rich, diverse landscapes of Saurashtra, our journey started with a commitment to pure, ethical beekeeping. We don't just harvest honey; we nurture the ecosystem that makes it possible.
            </p>
          </div>
        </section>

        {/* SECTION 2 - OUR BEE FARM */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 reveal-on-scroll opacity-0 translate-y-8">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Our Bee Farm</h2>
                <div className="w-16 h-1 bg-brand-orange mb-8 rounded-full" />
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Our farm is the heart of Saurashtra Honey. It is a sanctuary designed to mimic the natural habitats of our bees. Surrounded by vibrant, untouched flora and seasonal blooms, our bee boxes are placed carefully to ensure our colonies thrive. 
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  We maintain a pristine environment free from harmful chemicals, allowing the bees to forage freely across diverse natural landscapes. This biodiversity is the secret behind the rich, complex flavors of our honey.
                </p>
              </div>
              <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[600px] reveal-on-scroll opacity-0 translate-y-8">
                <img src={beeFarmImg} alt="Our natural bee farm landscape" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - OUR BEES */}
        <section id="our-bees" className="py-20 md:py-32 container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[600px] reveal-on-scroll opacity-0 translate-y-8">
              <img src={honeycombBeesImg} alt="Healthy bees on honeycomb" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="reveal-on-scroll opacity-0 translate-y-8">
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-brand-orange mb-4 block">The Heart of Our Brand</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Our Bees</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Healthy bees are the foundation of everything we do. A strong, vibrant colony is essential not only for producing premium honey but also for sustaining the local environment through pollination.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We closely monitor the health and vitality of our hives, ensuring our bees have everything they need to flourish naturally. Our deep understanding of bee behavior guides our gentle approach to colony management.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 - BEEKEEPING */}
        <section id="responsible-beekeeping" className="py-24 bg-[#2B2118] text-cream">
          <div className="container-page text-center">
            <div className="max-w-3xl mx-auto reveal-on-scroll opacity-0 translate-y-8">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">Responsible Beekeeping</h2>
              <p className="text-lg md:text-xl text-cream/80 leading-relaxed mb-12">
                Our beekeeping practices are rooted in respect for the natural ecosystem. We harvest honey only at the right time, ensuring the bees always have enough reserves for themselves. We believe in minimal intervention—letting nature take its course while we serve as careful stewards of the hives.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
              {[
                { title: "Gentle Harvesting", desc: "Extracting honey without harming the comb or the colony.", icon: HeartHandshake },
                { title: "Natural Foraging", desc: "Placing hives near rich, pesticide-free floral sources.", icon: Sparkles },
                { title: "Ecosystem First", desc: "Supporting local biodiversity through active pollination.", icon: Leaf },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm reveal-on-scroll opacity-0 translate-y-8" style={{ animationDelay: `${i * 150}ms` }}>
                  <item.icon className="size-10 text-brand-orange mb-6" />
                  <h3 className="font-serif text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-cream/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 - FROM HIVE TO HONEY TIMELINE */}
        <section id="from-hive-to-honey" className="py-24 md:py-32 container-page overflow-hidden">
          <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">From Hive to Honey</h2>
            <p className="text-foreground/70 text-lg">The natural journey of our pure honey.</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-brand-orange/20 -translate-x-1/2 rounded-full" />
            
            {[
              { step: "01", title: "Flowers Bloom", desc: "Seasonal flora provides rich nectar." },
              { step: "02", title: "Nectar Collection", desc: "Bees forage naturally across the landscape." },
              { step: "03", title: "Honeycomb", desc: "Bees store and fan the nectar into honey." },
              { step: "04", title: "Natural Maturation", desc: "The honey ripens naturally inside the hive." },
              { step: "05", title: "Harvesting", desc: "Carefully extracted leaving enough for the bees." },
              { step: "06", title: "Extraction & Filtering", desc: "Cold-extracted and lightly strained for purity." },
              { step: "07", title: "Bottling", desc: "Poured raw into jars, ready for your table." },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center mb-12 last:mb-0 reveal-on-scroll opacity-0 translate-y-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="absolute left-[27px] md:left-1/2 size-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold shadow-lg -translate-x-1/2 z-10 border-4 border-[#F8F5EF]">
                  {item.step}
                </div>
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-16 text-left" : "md:pr-16 md:text-right"}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:border-brand-orange/30 transition-colors">
                    <h3 className="font-serif text-xl font-bold mb-2 text-espresso">{item.title}</h3>
                    <p className="text-foreground/70 text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6 - PURE & NATURAL */}
        <section className="py-20 bg-white">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] reveal-on-scroll opacity-0 translate-y-8">
                <img src={honeyDrizzleImg} alt="Pure golden honey" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="order-1 lg:order-2 reveal-on-scroll opacity-0 translate-y-8">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Pure & Natural</h2>
                <div className="w-16 h-1 bg-brand-orange mb-8 rounded-full" />
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Our philosophy is simple: honey should be exactly as the bees made it. We do not pasteurize, ultra-filter, or add anything artificial. 
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  By maintaining this commitment to rawness, we preserve the natural pollens, enzymes, and unique floral profiles that give our honey its authentic character and distinct regional taste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 - OUR COMMITMENT */}
        <section className="py-24 bg-cream-deep/30">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll opacity-0 translate-y-8">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Our Commitment</h2>
              <p className="text-foreground/70 text-lg">A promise to our bees, our environment, and to you.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                "Respecting bees and their natural rhythms.",
                "Practicing responsible and ethical beekeeping.",
                "Protecting and nurturing natural ecosystems.",
                "Maintaining uncompromised raw quality.",
                "Supporting local environments and farmers.",
                "Delivering 100% authentic, traceable honey.",
              ].map((text, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4 border border-border/40 reveal-on-scroll opacity-0 translate-y-8" style={{ animationDelay: `${i * 100}ms` }}>
                  <CheckCircle2 className="size-6 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-foreground/90 font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 - VISUAL FARM GALLERY */}
        <section className="py-24 container-page">
          <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">Life on the Farm</h2>
            <p className="text-foreground/70 text-lg">A glimpse into our daily dedication.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-1 row-span-2 rounded-3xl overflow-hidden shadow-md reveal-on-scroll opacity-0 translate-y-8">
              <img src={beeFarmImg} alt="Farm landscape" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-md aspect-square md:aspect-auto h-[200px] md:h-full reveal-on-scroll opacity-0 translate-y-8" style={{ animationDelay: '100ms' }}>
              <img src={honeycombBeesImg} alt="Honeycomb" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-md aspect-square md:aspect-auto h-[200px] md:h-full reveal-on-scroll opacity-0 translate-y-8" style={{ animationDelay: '200ms' }}>
              <img src={beeFlowerImg} alt="Bee on flower" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-2 rounded-3xl overflow-hidden shadow-md h-[250px] md:h-[300px] reveal-on-scroll opacity-0 translate-y-8" style={{ animationDelay: '300ms' }}>
              <img src={familyHoneyImg} alt="Beekeeping community" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 bg-[#2B2118] text-center text-cream relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={heroProductsImg} alt="Background texture" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 container-page max-w-3xl mx-auto reveal-on-scroll opacity-0 translate-y-8">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">From Our Hives to Your Home</h2>
            <p className="text-lg md:text-xl text-cream/80 mb-10 font-light">
              Experience the natural character, purity, and unmatched flavor of Saurashtra Honey.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-sm tracking-widest">
              EXPLORE OUR HONEY <ChevronRight className="size-4" />
            </Link>
          </div>
        </section>

      </main>
    </SiteLayout>
  );
}
