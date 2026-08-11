import React, { useEffect, useState } from "react";
import { HeroSlider, type HeroSlide } from "@/components/site/HeroSlider";
import { fetchPublicHeroRows, getDefaultHeroSlides, heroRowToSlide } from "@/lib/hero-catalog";
import { useServerFn } from "@tanstack/react-start";

export function PageHeroSlider({
  page,
  interval = 6000,
}: {
  page: "home" | "shop" | "our-story" | "bee-farming" | "blog" | "bulk-orders" | "contact" | string;
  interval?: number;
}) {
  const [slides, setSlides] = useState<HeroSlide[]>(() =>
    getDefaultHeroSlides(page)
  );

  const getRows = useServerFn(fetchPublicHeroRows);

  useEffect(() => {
    void getRows({ data: { page } }).then((res) => {
      if (res && res.rows && res.rows.length > 0) {
        setSlides(res.rows.map(r => heroRowToSlide(r)));
      } else if (res && res.rows && res.rows.length === 0) {
        // If there are no slides for this page in the DB, we want to clear out any defaults 
        // to avoid leaking the Home defaults into the Shop page!
        const defaultSlides = getDefaultHeroSlides(page);
        setSlides(defaultSlides);
      }
    });
  }, [getRows, page]);

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
