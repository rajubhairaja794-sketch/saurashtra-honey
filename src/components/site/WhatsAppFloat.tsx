import { useSiteSettings } from "@/lib/site-settings";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const { whatsapp } = useSiteSettings();
  if (!whatsapp.enabled || !whatsapp.number) return null;
  const href = `https://wa.me/${whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(whatsapp.default_message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed z-50 bottom-[150px] md:bottom-6 right-4 md:right-6 size-14 rounded-full bg-[#25D366] text-white shadow-lift flex items-center justify-center hover:scale-105 transition-transform">
      <MessageCircle className="size-6" fill="currentColor" />
    </a>
  );
}
