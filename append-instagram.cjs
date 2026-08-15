const fs = require('fs');

const instagramComponent = `
import { Instagram } from "lucide-react";

export function HomeInstagramPreview({ feed, settings }: { feed: any, settings?: Record<string, any> }) {
  const isEnabled = feed?.settings?.is_enabled;
  const posts = feed?.posts || [];

  const eyebrow = settings?.eyebrow ?? "JOIN OUR JOURNEY";
  const heading = settings?.heading ?? "Follow Our Hive";
  const desc = settings?.description ?? "Stay connected for new harvests, behind-the-scenes moments, and everyday inspiration from our farms.";
  
  if (!isEnabled || posts.length === 0) {
    // Fallback state
    return (
      <section className="py-16 sm:py-24 bg-cream-deep/25 border-t border-border/80">
        <div className="container-page text-center">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            {eyebrow}
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]">
            {heading}
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] mx-auto leading-[1.7] mb-[36px]">
            Follow us on Instagram for the latest updates.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group"
          >
            <span>FOLLOW US ON INSTAGRAM</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-cream-deep/25 border-t border-border/80">
      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-[70px]">
          <div className="text-[12px] uppercase tracking-[6px] text-[#D97706] font-[600] mb-2 sm:mb-4">
            {eyebrow}
          </div>
          <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[56px] font-[500] text-[#2B2118] leading-tight mb-[20px]">
            {heading}
          </h2>
          <p className="text-[17px] md:text-[21px] text-[#6B6257] max-w-[700px] leading-[1.7] mb-[36px]">
            {desc}
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wider text-[#D97706] hover:text-[#B46204] uppercase group"
          >
            <Instagram className="size-4" />
            <span>FOLLOW US ON INSTAGRAM</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {posts.map((post: any) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden aspect-square bg-white border border-border/80 shadow-xs hover:shadow-lift transition-all duration-300"
            >
              <img
                src={post.media_type === "VIDEO" && post.thumbnail_url ? post.thumbnail_url : post.media_url}
                alt={post.caption || "Instagram post"}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-white size-8 opacity-90" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

let content = fs.readFileSync('src/components/site/HomeSections.tsx', 'utf8');
content += '\n' + instagramComponent;
fs.writeFileSync('src/components/site/HomeSections.tsx', content);

