import logoAsset from "@/assets/saurashtra-honey-logo.png.asset.json";
import { useCompanyLogoUrl } from "@/lib/company-settings";
import React, { useState } from "react";

function FallbackBeeIcon({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="22" fill="#FDF8F0" stroke="#C88A2B" strokeWidth="2" />
      <path d="M24 10C24 10 16 16 16 24C16 32 24 38 24 38C24 38 32 32 32 24C32 16 24 10 24 10Z" fill="#C88A2B" fillOpacity="0.15" stroke="#C88A2B" strokeWidth="2" />
      <circle cx="24" cy="18" r="4" fill="#C88A2B" />
      <path d="M18 24H30M19 28H29M21 32H27" stroke="#49301F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BeeLogo({ className = "max-h-[52px] w-auto object-contain shrink-0" }: { className?: string }) {
  const dynamicLogoUrl = useCompanyLogoUrl();
  const primarySrc = dynamicLogoUrl || logoAsset.url;
  const [srcIndex, setSrcIndex] = useState(0);

  const sources = [primarySrc, "/favicon.ico"];

  if (srcIndex >= sources.length) {
    return <FallbackBeeIcon className={className} />;
  }

  return (
    <img
      src={sources[srcIndex]}
      alt="Saurashtra Honey Bee Farm"
      className={className}
      style={{
        filter: "none",
        opacity: 1,
        mixBlendMode: "normal",
        WebkitMask: "none",
        mask: "none",
      }}
      loading="eager"
      decoding="async"
      onError={() => setSrcIndex((idx) => idx + 1)}
    />
  );
}

export function BrandMark({ dark = false, alwaysShowText = false }: { dark?: boolean; alwaysShowText?: boolean }) {
  const dynamicLogoUrl = useCompanyLogoUrl();
  const primarySrc = dynamicLogoUrl || logoAsset.url;
  const [srcIndex, setSrcIndex] = useState(0);

  const sources = [primarySrc, "/favicon.ico"];

  const textContainerClasses = alwaysShowText ? "block" : "hidden sm:block";

  return (
    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
      {srcIndex >= sources.length ? (
        <FallbackBeeIcon className="h-[56px] w-auto sm:h-[64px] object-contain shrink-0" />
      ) : (
        <img
          src={sources[srcIndex]}
          alt="Saurashtra Honey Bee Farm"
          className="h-[56px] w-auto sm:h-[64px] object-contain shrink-0"
          style={{
            filter: "none",
            opacity: 1,
            mixBlendMode: "normal",
            WebkitMask: "none",
            mask: "none",
          }}
          loading="eager"
          decoding="async"
          onError={() => setSrcIndex((idx) => idx + 1)}
        />
      )}
      <span className={`leading-none shrink-0 ${textContainerClasses}`}>
        <span className={`block font-serif text-[18px] md:text-2xl font-bold tracking-tight ${dark ? "text-cream" : "text-espresso"}`}>Saurashtra</span>
        <span className={`block text-[8.5px] md:text-[10px] tracking-[0.35em] uppercase font-semibold mt-1 ${dark ? "text-cream/70" : "text-brand-orange"}`}>Honey Bee Farm</span>
      </span>
    </div>
  );
}
