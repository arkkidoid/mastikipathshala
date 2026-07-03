// Static class maps so Tailwind can see every class at build time.

export type AccentKey =
  | "orange"
  | "sun"
  | "sky"
  | "mint"
  | "grape"
  | "rose"
  | "ink";

type AccentStyle = {
  tint: string; // soft background
  text: string; // icon / accent text
  solid: string; // solid background
  ring: string; // border ring
  grad: string; // gradient (from-to)
};

export const ACCENTS: Record<AccentKey, AccentStyle> = {
  orange: {
    tint: "bg-orange-tint",
    text: "text-orange",
    solid: "bg-orange",
    ring: "ring-orange/20",
    grad: "from-orange to-sun",
  },
  sun: {
    tint: "bg-sun-tint",
    text: "text-[#E0A400]",
    solid: "bg-sun",
    ring: "ring-sun/30",
    grad: "from-sun to-orange",
  },
  sky: {
    tint: "bg-sky-tint",
    text: "text-sky",
    solid: "bg-sky",
    ring: "ring-sky/20",
    grad: "from-sky to-mint",
  },
  mint: {
    tint: "bg-mint-tint",
    text: "text-mint",
    solid: "bg-mint",
    ring: "ring-mint/20",
    grad: "from-mint to-sky",
  },
  grape: {
    tint: "bg-grape-tint",
    text: "text-grape",
    solid: "bg-grape",
    ring: "ring-grape/20",
    grad: "from-grape to-sky",
  },
  rose: {
    tint: "bg-rose-tint",
    text: "text-rose",
    solid: "bg-rose",
    ring: "ring-rose/20",
    grad: "from-rose to-orange",
  },
  ink: {
    tint: "bg-ink/5",
    text: "text-ink",
    solid: "bg-ink",
    ring: "ring-ink/15",
    grad: "from-ink to-sky",
  },
};

export function accent(key: string): AccentStyle {
  return ACCENTS[(key as AccentKey) in ACCENTS ? (key as AccentKey) : "orange"];
}
