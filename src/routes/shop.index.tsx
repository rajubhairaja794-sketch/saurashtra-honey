import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/shop/ShopPage";
import { z } from "zod";

const searchSchema = z
  .object({
    category: z.string().optional(),
    cat: z.string().optional(),
    q: z.string().optional(),
    sort: z.enum(["popular", "price-asc", "price-desc", "newest", "rating"]).optional(),
  })
  .catchall(z.unknown());

export const Route = createFileRoute("/shop/")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop | Saurashtra Honey" },
      { name: "description", content: "Explore our premium selection of raw honey and bee-crafted essentials." },
    ],
  }),
  component: () => <ShopPage />,
});
