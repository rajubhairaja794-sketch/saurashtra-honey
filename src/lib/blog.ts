import drizzle from "@/assets/honey-drizzle.jpg";
import beeFarm from "@/assets/bee-farm.jpg";
import beeFlower from "@/assets/bee-flower.jpg";
import comb from "@/assets/honeycomb-bees.jpg";
import ajwain from "@/assets/prod-ajwain.jpg";
import family from "@/assets/family-honey.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;      // ISO
  displayDate: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  body: string[];    // paragraphs
};

export const blogPosts: BlogPost[] = [
  {
    slug: "7-health-benefits-of-raw-honey",
    title: "7 Health Benefits of Raw Honey You Should Know",
    date: "2024-05-14",
    displayDate: "May 14, 2024",
    readTime: "5 min",
    category: "Honey & Health",
    image: ajwain,
    excerpt: "From boosting immunity to improving digestion, raw honey is nature's true superfood.",
    body: [
      "Raw honey is honey that has never been heated or filtered past what's needed to remove wax and debris. Keeping it in its natural state preserves the enzymes, pollen and antioxidants that make honey more than a sweetener.",
      "Rich in antioxidants such as flavonoids and phenolic acids, raw honey helps the body fight oxidative stress. A daily spoonful can support long-term cellular health.",
      "Traditionally used to soothe sore throats and coughs, honey coats the throat and offers gentle antimicrobial support — a reason it's a staple in home remedies across generations.",
      "Its natural enzymes aid digestion and act as a mild prebiotic, feeding the good bacteria in your gut for a healthier microbiome.",
      "Because raw honey contains natural sugars alongside minerals, it delivers steady energy without the crash of refined sugar — a smart pre-workout swap.",
      "Topically, honey has been used for centuries on minor burns and cuts thanks to its natural antibacterial properties.",
      "Enjoy raw honey in warm (not hot) water with lemon, drizzled over fruit, or straight off the spoon. Avoid boiling it to preserve its living enzymes.",
    ],
  },
  {
    slug: "inside-our-bee-farms",
    title: "Inside Our Bee Farms: Where Pure Honey Begins",
    date: "2024-05-10",
    displayDate: "May 10, 2024",
    readTime: "6 min",
    category: "Bee Farming",
    image: beeFarm,
    excerpt: "A look at our natural beekeeping practices and how we ensure the highest purity.",
    body: [
      "Our farms sit in the fertile floral belts of Saurashtra, where diverse wildflowers, ajwain, fennel and mustard bloom across the seasons.",
      "We work with small family beekeepers who share a commitment to natural, low-intervention beekeeping — no antibiotics, no artificial feeding when nectar is flowing.",
      "Every hive is inspected regularly for colony health. Strong, calm colonies produce cleaner, better-tasting honey.",
      "Honey is harvested only when the combs are naturally capped by the bees, ensuring the right moisture and ripeness in every jar.",
      "After harvest we strain out wax and debris — nothing more. No heating past hive temperature, no ultra-filtration, no additives.",
      "The result is honey that still crystallises, still tastes of its floral origin, and still carries the enzymes nature intended.",
    ],
  },
  {
    slug: "raw-vs-processed-honey",
    title: "Raw Honey vs Processed Honey: What's the Difference?",
    date: "2024-05-08",
    displayDate: "May 08, 2024",
    readTime: "4 min",
    category: "Natural Living",
    image: drizzle,
    excerpt: "Learn how raw honey is different and why purity matters for your health.",
    body: [
      "Processed honey is typically pasteurised at high temperatures and ultra-filtered to give it a uniform look and long shelf life on supermarket shelves.",
      "That processing strips away pollen, enzymes and much of the antioxidant content — leaving behind mostly sweet syrup.",
      "Raw honey looks and behaves like a living food: it varies in colour, aroma and texture depending on flora and season, and it crystallises naturally over time.",
      "For everyday sweetness both will do; for the goodness people actually associate with honey, raw is the real thing.",
    ],
  },
  {
    slug: "summer-drinks-with-honey",
    title: "5 Refreshing Summer Drinks with Honey",
    date: "2024-05-05",
    displayDate: "May 05, 2024",
    readTime: "3 min",
    category: "Recipes",
    image: drizzle,
    excerpt: "Beat the heat naturally with these easy and healthy honey-based summer drinks.",
    body: [
      "Honey Lemonade — cold water, fresh lemon juice, a spoon of raw honey, and mint leaves. Stir well and serve over ice.",
      "Honey Iced Tea — cool a light black or green tea, sweeten with honey and finish with a lemon wedge.",
      "Honey Mint Cooler — muddle mint with honey, top up with sparkling water for a crisp, herbal drink.",
      "Honey Buttermilk — whisk chilled buttermilk with a spoon of honey, a pinch of black salt and roasted cumin.",
      "Honey Ginger Refresher — brew ginger in warm water, cool, sweeten with honey and add lime for a zesty pick-me-up.",
    ],
  },
  {
    slug: "how-bees-help-our-planet",
    title: "How Bees Help Our Planet Bloom",
    date: "2024-05-02",
    displayDate: "May 02, 2024",
    readTime: "6 min",
    category: "Sustainability",
    image: beeFlower,
    excerpt: "Bees play a vital role in pollination and maintaining the balance of our ecosystem.",
    body: [
      "Bees pollinate a large share of the fruits, vegetables and nuts we eat — protecting bees means protecting our food supply.",
      "Beyond crops, wild pollination keeps forests and grasslands healthy, supporting biodiversity from soil microbes to birds.",
      "Simple actions help: plant native flowers, avoid pesticides, and choose honey from beekeepers who prioritise colony health.",
      "Supporting small-batch, natural beekeepers keeps traditional pollination-first practices alive.",
    ],
  },
  {
    slug: "life-cycle-of-a-honey-bee",
    title: "Understanding the Life Cycle of a Honey Bee",
    date: "2024-04-30",
    displayDate: "Apr 30, 2024",
    readTime: "6 min",
    category: "Bee Farming",
    image: comb,
    excerpt: "From egg to adult, explore the fascinating life cycle of honey bees.",
    body: [
      "A honey bee's life begins as a tiny egg laid in a hexagonal comb cell by the colony's queen.",
      "The egg hatches into a larva, cared for and fed by nurse bees for several days.",
      "The cell is capped and the larva pupates, transforming into an adult over about a week.",
      "Newly emerged workers first tend to the hive, then progress to guarding and foraging as they mature.",
      "The queen can live for years, while workers live only weeks in the busy season — a rhythm that keeps the colony thriving.",
    ],
  },
  {
    slug: "how-to-identify-pure-honey",
    title: "How to Identify Pure Honey",
    date: "2024-04-28",
    displayDate: "Apr 28, 2024",
    readTime: "4 min",
    category: "Honey & Health",
    image: ajwain,
    excerpt: "Simple ways to tell raw, pure honey from adulterated supermarket blends.",
    body: [
      "Pure honey tends to crystallise over time — a natural sign of authenticity, not spoilage.",
      "Look for varietal aroma and flavour that reflects the flora it came from.",
      "Check for a lab report; reputable brands share moisture, HMF and sugar-profile results.",
      "Trust small-batch producers who name their farms and floral sources.",
    ],
  },
  {
    slug: "best-flora-for-honey",
    title: "Best Flora for Honey: Ajwain, Fennel & More",
    date: "2024-04-25",
    displayDate: "Apr 25, 2024",
    readTime: "6 min",
    category: "Natural Living",
    image: beeFlower,
    excerpt: "A tour of the single-flora honeys that make Saurashtra special.",
    body: [
      "Ajwain honey has a warm, savoury note and is traditionally valued as a digestive aid.",
      "Fennel honey is mildly sweet with a soothing herbal aroma — great in warm water.",
      "Lychee honey is delicate and floral, ideal drizzled over fruit or yoghurt.",
      "Multiflora honey blends the character of many wildflowers into a rounded, everyday jar.",
    ],
  },
  {
    slug: "honey-lemon-water-benefits",
    title: "Honey & Lemon Water: Benefits & How to Use",
    date: "2024-04-22",
    displayDate: "Apr 22, 2024",
    readTime: "3 min",
    category: "Recipes",
    image: drizzle,
    excerpt: "A simple morning ritual that supports hydration and digestion.",
    body: [
      "Warm (not boiling) water preserves honey's natural enzymes.",
      "Half a lemon adds vitamin C and a bright, wake-up flavour.",
      "Drink on an empty stomach to gently kickstart digestion.",
      "Stay consistent — small daily habits do more than occasional detox trends.",
    ],
  },
  {
    slug: "how-we-ensure-purity",
    title: "How We Ensure Every Drop is Unadulterated",
    date: "2024-04-20",
    displayDate: "Apr 20, 2024",
    readTime: "5 min",
    category: "Sustainability",
    image: family,
    excerpt: "Behind-the-scenes look at our quality process from hive to jar.",
    body: [
      "Every batch is tested for moisture, HMF, fructose/glucose ratio and any sign of adulteration.",
      "We only harvest capped combs and never blend with imported syrup honey.",
      "Traceability starts at the farm: each jar can be traced back to its batch and floral source.",
      "Purity is a system, not a marketing claim — and our lab reports back it up.",
    ],
  },
];

export function findPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, category: string, n = 3) {
  const same = blogPosts.filter((p) => p.slug !== slug && p.category === category);
  const rest = blogPosts.filter((p) => p.slug !== slug && p.category !== category);
  return [...same, ...rest].slice(0, n);
}
