export type MenuItem = {
  slug: string;
  name: string;
  price: number;
  tag?: string;
  category: "Coffee" | "Cold" | "Dessert" | "Tea";
  blurb: string; // short line for the list
  description: string; // longer copy for the detail page
  notes: string[]; // tasting / detail bullets
  image: string;
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MENU: MenuItem[] = [
  {
    slug: "signature-pour-over",
    name: "Signature Pour-Over",
    price: 220,
    tag: "Bestseller",
    category: "Coffee",
    blurb: "Single-origin, brewed to order — caramel and stone fruit on the nose.",
    description:
      "Our flagship cup. A single-origin bean, ground to order and hand-poured in a slow spiral so every gram gives its best. Clean, bright, and layered — the kind of coffee you taste the roast date in.",
    notes: ["Single-origin, rotated weekly", "Hand-poured, ~3 min brew", "Notes: caramel, stone fruit, cocoa"],
    image: u("1442512595331-e89e73853f31"),
  },
  {
    slug: "salted-caramel-latte",
    name: "Salted Caramel Latte",
    price: 260,
    tag: "Signature",
    category: "Coffee",
    blurb: "Double espresso, steamed milk, house caramel, flake of sea salt.",
    description:
      "A double shot pulled tight, folded into silky steamed milk, finished with our slow-cooked house caramel and a flake of sea salt. Sweet, but grown-up about it.",
    notes: ["Double ristretto shot", "House caramel, made in-house", "Finished with Maldon sea salt"],
    image: u("1541167760496-1628856ab772"),
  },
  {
    slug: "cold-brew-concentrate",
    name: "Cold Brew Concentrate",
    price: 240,
    tag: "New",
    category: "Cold",
    blurb: "18-hour steep, served over ice with a splash of oat milk.",
    description:
      "Coarse-ground beans steeped for eighteen hours in cold water — no heat, no bitterness. Served long over ice with a splash of oat milk. Smooth, chocolatey, and quietly strong.",
    notes: ["18-hour cold steep", "Naturally low-acid", "Over ice, oat milk splash"],
    image: u("1517701550927-30cf4ba1dba5"),
  },
  {
    slug: "classic-cappuccino",
    name: "Classic Cappuccino",
    price: 200,
    category: "Coffee",
    blurb: "Equal parts espresso, steamed milk, and velvet microfoam.",
    description:
      "The one we judge every café by. Equal thirds — espresso, steamed milk, and a cap of velvet microfoam poured into a rosetta. Simple, done right, every single time.",
    notes: ["Equal-thirds build", "Latte-art poured", "Available decaf on request"],
    image: u("1572442388796-11668a67e53d"),
  },
  {
    slug: "affogato",
    name: "Affogato",
    price: 280,
    tag: "Dessert",
    category: "Dessert",
    blurb: "Double shot poured tableside over vanilla bean gelato.",
    description:
      "Dessert and coffee in one glass. A scoop of vanilla bean gelato, a double espresso pulled fresh and poured over it at your table. Watch it melt, then eat it with a spoon.",
    notes: ["Vanilla bean gelato", "Double shot, poured tableside", "Best eaten immediately"],
    image: u("1563805042-7684c019e1cb"),
  },
  {
    slug: "masala-chai",
    name: "Masala Chai (House)",
    price: 180,
    category: "Tea",
    blurb: "Slow-simmered with fresh ginger, green cardamom, black pepper.",
    description:
      "Not from a syrup. Loose black tea slow-simmered with milk, fresh ginger, green cardamom, cinnamon and a crack of black pepper. Spiced, warming, and properly strong.",
    notes: ["Slow-simmered, never syrup", "Fresh ginger + whole spices", "Adjustable sweetness"],
    image: u("1571934811356-5cc061b6821f"),
  },
];

export const getMenuItem = (slug?: string) => MENU.find((m) => m.slug === slug);
