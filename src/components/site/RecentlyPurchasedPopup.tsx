import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/lib/site-settings";
import { ShoppingBag, X } from "lucide-react";

type Row = { first_name: string; city: string; product_name: string; created_at: string };

function timeAgo(iso: string) {
  const m = Math.max(1, Math.floor((Date.now() - +new Date(iso)) / 60000));
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function RecentlyPurchasedPopup() {
  const { features } = useSiteSettings();
  const [rows, setRows] = useState<Row[]>([]);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!features.recently_purchased_popup) return;
    (async () => {
      const { data } = await supabase.rpc("recent_public_orders", { _limit: 8 });
      if (data) setRows(data as Row[]);
    })();
  }, [features.recently_purchased_popup]);

  useEffect(() => {
    if (!rows.length || dismissed) return;
    const cycle = () => { setOpen(true); setTimeout(() => setOpen(false), 5500); };
    const t = setTimeout(cycle, 12000);
    const iv = setInterval(() => { setI((n) => (n + 1) % rows.length); cycle(); }, 22000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [rows, dismissed]);

  if (!features.recently_purchased_popup || !rows.length || !open) return null;
  const r = rows[i];
  return (
    <div className="fixed z-40 bottom-24 md:bottom-24 left-4 max-w-xs bg-white border border-border rounded-xl shadow-lift p-3 pr-8 flex gap-3 items-start animate-in slide-in-from-bottom-4">
      <div className="size-10 rounded-full bg-gold/20 text-gold-deep flex items-center justify-center shrink-0"><ShoppingBag className="size-5" /></div>
      <div className="text-xs text-forest-dark">
        <div className="font-semibold">{r.first_name}{r.city ? ` from ${r.city}` : ""}</div>
        <div className="text-muted-foreground mt-0.5">just ordered <span className="font-medium text-forest-dark">{r.product_name}</span></div>
        <div className="text-[10px] text-muted-foreground/70 mt-1">{timeAgo(r.created_at)} · Verified</div>
      </div>
      <button onClick={() => { setOpen(false); setDismissed(true); }} aria-label="Close" className="absolute top-2 right-2 text-muted-foreground hover:text-forest-dark"><X className="size-3.5" /></button>
    </div>
  );
}
