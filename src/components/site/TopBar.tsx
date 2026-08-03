import React from "react";

const announcementMessages = [
  <span key="1" className="inline-flex items-center gap-2">
    <span className="shrink-0">🚚</span>
    <span className="text-white font-bold">Free Delivery on orders above ₹400</span>
  </span>,
  <span key="2" className="inline-flex items-center gap-2">
    <span className="shrink-0">🍯</span>
    <span className="text-white font-bold">
      Up to 24% OFF All Honey + Up to 10% Off on Prepaid
    </span>
  </span>,
  <span key="3" className="inline-flex items-center gap-2">
    <span className="shrink-0">🎁</span>
    <span className="text-white font-bold">First order? Get Flat 10% OFF</span>
  </span>,
  <span key="4" className="inline-flex items-center gap-2">
    <span className="shrink-0">🐝</span>
    <span className="text-white font-bold">100% Pure &amp; Natural Honey</span>
  </span>,
  <span key="5" className="inline-flex items-center gap-2">
    <span className="shrink-0">🛡️</span>
    <span className="text-white font-bold">
      Independently Lab-Tested for Purity in Every Batch
    </span>
  </span>,
  <span key="6" className="inline-flex items-center gap-2">
    <span className="shrink-0">🌿</span>
    <span className="text-white font-bold">Raw, Natural &amp; Unprocessed</span>
  </span>,
];

export function TopBar() {
  // We duplicate the message group twice per half (12 items per half, 24 items total)
  // to ensure there is never any empty/blank area even on ultra-wide monitors,
  // creating a mathematically seamless infinite loop.
  const loopGroup = [...announcementMessages, ...announcementMessages];

  return (
    <div
      className="bg-[#B57420] w-full max-w-[100vw] text-white border-b border-white/10 py-2.5 px-4 text-xs sm:text-sm font-bold tracking-wide select-none overflow-hidden relative flex items-center"
      role="region"
      aria-label="Announcement bar"
    >
      <div className="flex w-max items-center animate-ticker">
        {/* First Half (0% to -50% translation area) */}
        <div className="flex items-center shrink-0">
          {loopGroup.map((msg, idx) => (
            <React.Fragment key={`half-1-${idx}`}>
              <div className="px-5 sm:px-7 whitespace-nowrap">{msg}</div>
              <span className="text-white font-bold select-none px-1">•</span>
            </React.Fragment>
          ))}
        </div>

        {/* Second Half (Exact clone for seamless looping) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {loopGroup.map((msg, idx) => (
            <React.Fragment key={`half-2-${idx}`}>
              <div className="px-5 sm:px-7 whitespace-nowrap">{msg}</div>
              <span className="text-white font-bold select-none px-1">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
