import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export type HeroSlide = {
  image: string;
  mobileImage?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  ctaText: string;
  ctaTo: string;
  ctaParams?: Record<string, string>;
  align?: "left" | "center";
};

export function HeroSlider({
  slides,
  interval = 6000,
  size = "md",
  variant,
}: {
  slides: HeroSlide[];
  interval?: number;
  size?: "sm" | "md" | "home" | "inner";
  variant?: "home" | "inner";
}) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paused = useRef(false);
  const touchX = useRef<number | null>(null);

  const go = (n: number, d: 1 | -1 = 1) => {
    if (!slides || slides.length <= 1) return;
    setDir(d);
    setI((n + slides.length) % slides.length);
  };
  const next = () => go(i + 1, 1);
  const prev = () => go(i - 1, -1);

  useEffect(() => {
    if (paused.current || !slides || slides.length <= 1) return;
    timer.current = setTimeout(() => go(i + 1, 1), interval);
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, interval, slides?.length]);

  const effVariant = variant === "home" || size === "home" || size === "md" ? "home" : "inner";
  const heightCls = effVariant === "home"
    ? "h-[600px] max-h-[85vh] sm:h-[650px] md:h-[700px] lg:h-auto lg:aspect-[1920/700]"
    : "h-[400px] max-h-[70vh] sm:h-[450px] md:h-[500px] lg:h-auto lg:aspect-[1920/600]";
  const titleCls = effVariant === "inner"
    ? "mt-2 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.06] font-bold text-cream"
    : "mt-2.5 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.04] font-bold text-cream";

  if (!slides || slides.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#120E0C]"
      onMouseEnter={() => { paused.current = true; if (timer.current) clearTimeout(timer.current); }}
      onMouseLeave={() => { paused.current = false; setI((v) => v); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
        touchX.current = null;
      }}
      aria-roledescription="carousel"
    >
      <div className={`relative w-full ${heightCls}`}>
        {slides.map((s, idx) => {
          const isActive = idx === i;
          const offset = isActive ? "translate-x-0 opacity-100 z-10" : `${dir === 1 ? "translate-x-full" : "-translate-x-full"} opacity-0 z-0`;
          return (
            <div
              key={idx}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${offset}`}
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={s.image}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Overall neutral dark film for cinematic contrast without warm/orange color cast */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: "rgba(18, 14, 12, 0.18)" }}
              />
              {/* Localized neutral gradient behind text for legibility while keeping photography original */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    s.align === "center"
                      ? "radial-gradient(ellipse at center, rgba(15, 12, 10, 0.45) 0%, rgba(15, 12, 10, 0.18) 45%, rgba(15, 12, 10, 0.00) 80%)"
                      : "linear-gradient(90deg, rgba(15, 12, 10, 0.48) 0%, rgba(15, 12, 10, 0.18) 38%, rgba(15, 12, 10, 0.00) 72%)",
                }}
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container-page w-full py-10">
                  <div className={`grid ${s.align === "center" ? "place-items-center text-center" : "lg:grid-cols-[1fr_auto] items-center gap-10"}`}>
                    <div className={`max-w-md md:max-w-xl lg:max-w-2xl ${s.align === "center" ? "mx-auto" : ""}`}>
                      <div className="inline-flex items-center gap-2 bg-espresso/85 border border-burnt-orange/40 px-4.5 py-1.5 rounded-full backdrop-blur-md mb-4 shadow-md">
                        <span className="text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] font-semibold tracking-[0.14em] text-burnt-orange uppercase leading-snug">{s.eyebrow}</span>
                      </div>
                      <h1 className={titleCls}>
                        {s.title}
                      </h1>
                      <p className="mt-3 md:mt-5 text-cream/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal">{s.subtitle}</p>
                      <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4">
                        <Link
                          to={s.ctaTo as string}
                          params={s.ctaParams as never}
                          className="inline-flex items-center gap-2.5 bg-burnt-orange hover:bg-terracotta text-white rounded-full px-7 md:px-8 py-3.5 md:py-4 text-xs md:text-sm font-bold tracking-widest shadow-lift transition-all hover:scale-105"
                        >
                          {s.ctaText} <ArrowRight className="size-4" />
                        </Link>
                      </div>
                      {effVariant === "home" && s.align !== "center" && (
                        <div className="mt-7 hidden sm:flex items-center gap-6 text-xs text-cream/85 font-semibold tracking-wide">
                          <span className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-burnt-orange" /> Lab Tested Purity
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-burnt-orange" /> 100% Raw & Unprocessed
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-burnt-orange" /> Direct From Wildflower Farms
                          </span>
                        </div>
                      )}
                    </div>
                    {effVariant === "home" && s.align !== "center" && (
                      <div className="hidden lg:flex items-center justify-center">
                        <div className="size-36 rounded-full border border-burnt-orange/50 bg-espresso/70 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-105">
                          <span className="text-[10px] uppercase tracking-[0.25em] text-cream/80 font-bold">Saurashtra</span>
                          <span className="font-serif text-sm font-bold text-cream mt-0.5">100% PURE</span>
                          <span className="text-[11px] font-bold text-burnt-orange tracking-widest mt-1">LAB TESTED</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 size-8 md:size-10 rounded-full bg-cream/15 hover:bg-cream/35 text-cream backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="size-4 md:size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 size-8 md:size-10 rounded-full bg-cream/15 hover:bg-cream/35 text-cream backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronRight className="size-4 md:size-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => go(idx, idx > i ? 1 : -1)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-6 bg-burnt-orange" : "w-1.5 bg-cream/40 hover:bg-cream/70"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
