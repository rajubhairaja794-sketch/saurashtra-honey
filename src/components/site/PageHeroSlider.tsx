import React, { useEffect, useState } from "react";
import { HeroSlider, type HeroSlide } from "@/components/site/HeroSlider";
import { getPublicHeroSlides } from "@/lib/hero-catalog";

export function PageHeroSlider({
  page,
  interval = 6000,
}: {
  page: "home" | "shop" | "our-story" | "bee-farming" | "blog" | "bulk-orders" | "contact" | string;
  interval?: number;
}) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    void getPublicHeroSlides(page).then((res) => {
      if (!res.error && res.slides.length > 0) {
        setSlides(res.slides);
      }
    });
  }, [page]);

  const isHome = page.toLowerCase() === "home";

  return (
    <HeroSlider
      slides={slides}
      interval={interval}
      size={isHome ? "home" : "inner"}
      variant={isHome ? "home" : "inner"}
    />
  );
}
