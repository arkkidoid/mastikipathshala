import {
  PROGRAMS,
  FEATURES,
  METRICS,
  JOURNEY,
  TESTIMONIALS,
  EVENTS,
  MENTORS,
  FAQS,
  GALLERY,
  REELS,
  CONTACT,
  APP,
} from "@/lib/data";

/**
 * THE CONTENT REGISTRY
 * --------------------
 * Every editable part of the public site is described here once. The generic
 * dashboard forms, the CRUD API, and the public content loader are all driven
 * by this file — so adding a brand-new manageable section later means adding
 * one object to SECTIONS, with no new API or UI code.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "url"
  | "image";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
  half?: boolean; // render two-per-row on wide screens
};

export type SectionKind = "singleton" | "collection";

export type Section = {
  slug: string;
  label: string; // plural / section name
  singular: string; // one item
  group: string;
  kind: SectionKind;
  icon: string; // emoji for the sidebar
  description: string;
  titleField: string; // which field represents an item in lists
  fields: Field[];
  defaults: Record<string, unknown> | Record<string, unknown>[];
};

export const ACCENT_OPTIONS = [
  { value: "orange", label: "Orange" },
  { value: "sun", label: "Yellow" },
  { value: "sky", label: "Sky Blue" },
  { value: "mint", label: "Mint" },
  { value: "grape", label: "Purple" },
  { value: "rose", label: "Rose" },
  { value: "ink", label: "Navy" },
];

export const ICON_OPTIONS = [
  "robot", "code", "chess", "music", "dance", "art", "story", "mic", "shield",
  "mentor", "users", "hands", "sparkle", "heart", "activity", "star", "compass",
  "trophy", "flag", "calendar", "clock", "check", "play",
].map((v) => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }));

const accentField = (): Field => ({
  name: "accent",
  label: "Colour",
  type: "select",
  options: ACCENT_OPTIONS,
  half: true,
});
const iconField = (): Field => ({
  name: "icon",
  label: "Icon",
  type: "select",
  options: ICON_OPTIONS,
  half: true,
});

export const SECTIONS: Section[] = [
  /* ---------------- Homepage ---------------- */
  {
    slug: "hero",
    label: "Hero Section",
    singular: "Hero",
    group: "Homepage",
    kind: "singleton",
    icon: "🎯",
    description: "The big headline area at the top of the homepage.",
    titleField: "titleHighlight",
    fields: [
      { name: "eyebrow", label: "Eyebrow badge", type: "text" },
      { name: "titleLead", label: "Headline (start)", type: "text", help: "e.g. “Where every child learns to”" },
      { name: "titleHighlight", label: "Headline (highlighted word)", type: "text", help: "The gradient/underlined word, e.g. “lead”" },
      { name: "subtitle", label: "Supporting text", type: "textarea" },
      { name: "primaryCta", label: "Primary button label", type: "text", half: true },
      { name: "secondaryCta", label: "Secondary button label", type: "text", half: true },
      { name: "ratingText", label: "Rating / trust line", type: "text" },
    ],
    defaults: {
      eyebrow: "Loved by parents, kids & adults",
      titleLead: "Where every child learns to",
      titleHighlight: "lead",
      subtitle:
        "A premium 21st-century skill development academy for kids & adults. Robotics, coding, chess, music, dance & more — taught with joy, in small caring batches.",
      primaryCta: "Book Free Trial",
      secondaryCta: "Explore Programs",
      ratingText: "Loved by parents & learners across our branches",
    },
  },

  /* ---------------- Programs & Learning ---------------- */
  {
    slug: "programs",
    label: "Programs",
    singular: "Program",
    group: "Programs & Learning",
    kind: "collection",
    icon: "🎨",
    description: "The program cards (Robotics, Coding, Chess…).",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      iconField(),
      accentField(),
      { name: "desc", label: "Description", type: "textarea", required: true },
      { name: "age", label: "Age group", type: "text", half: true, placeholder: "7–16 yrs" },
      { name: "duration", label: "Duration", type: "text", half: true, placeholder: "12 weeks" },
    ],
    defaults: PROGRAMS as unknown as Record<string, unknown>[],
  },
  {
    slug: "features",
    label: "Why Choose Us",
    singular: "Feature",
    group: "Programs & Learning",
    kind: "collection",
    icon: "⭐",
    description: "The “Why Choose Us” feature cards.",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      iconField(),
      accentField(),
      { name: "desc", label: "Description", type: "textarea", required: true },
    ],
    defaults: FEATURES as unknown as Record<string, unknown>[],
  },
  {
    slug: "journey",
    label: "Learning Journey",
    singular: "Step",
    group: "Programs & Learning",
    kind: "collection",
    icon: "🧭",
    description: "The 5-step learning journey timeline.",
    titleField: "step",
    fields: [
      { name: "step", label: "Step name", type: "text", required: true },
      iconField(),
      accentField(),
      { name: "desc", label: "Description", type: "textarea", required: true },
    ],
    defaults: JOURNEY as unknown as Record<string, unknown>[],
  },
  {
    slug: "events",
    label: "Events",
    singular: "Event",
    group: "Programs & Learning",
    kind: "collection",
    icon: "📅",
    description: "Upcoming workshops, camps and competitions.",
    titleField: "title",
    fields: [
      { name: "tag", label: "Tag", type: "text", half: true, placeholder: "Workshop" },
      { name: "date", label: "Date", type: "text", half: true, placeholder: "Jul 19–20, 2026" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "desc", label: "Description", type: "textarea", required: true },
      iconField(),
      accentField(),
    ],
    defaults: EVENTS as unknown as Record<string, unknown>[],
  },

  /* ---------------- Social Proof ---------------- */
  {
    slug: "metrics",
    label: "Success Metrics",
    singular: "Metric",
    group: "Social Proof",
    kind: "collection",
    icon: "📊",
    description: "The animated counters (students, courses…).",
    titleField: "label",
    fields: [
      { name: "value", label: "Number", type: "number", required: true, half: true },
      { name: "suffix", label: "Suffix", type: "text", half: true, placeholder: "+" },
      { name: "label", label: "Label", type: "text", required: true },
    ],
    defaults: METRICS as unknown as Record<string, unknown>[],
  },
  {
    slug: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    group: "Social Proof",
    kind: "collection",
    icon: "💬",
    description: "Parent reviews in the sliding carousel.",
    titleField: "name",
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "name", label: "Name", type: "text", required: true, half: true },
      { name: "role", label: "Role", type: "text", half: true, placeholder: "Mother of Aanya, 9" },
      { name: "initials", label: "Initials", type: "text", half: true, placeholder: "PS" },
      { name: "rating", label: "Rating (1–5)", type: "number", half: true },
      accentField(),
    ],
    defaults: TESTIMONIALS as unknown as Record<string, unknown>[],
  },
  {
    slug: "mentors",
    label: "Mentors",
    singular: "Mentor",
    group: "Social Proof",
    kind: "collection",
    icon: "👩‍🏫",
    description: "Teacher / mentor profile cards.",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "subject", label: "Subject / role", type: "text", half: true },
      { name: "exp", label: "Experience", type: "text", half: true, placeholder: "9 yrs • IIT alumna" },
      { name: "initials", label: "Initials", type: "text", half: true, placeholder: "AR" },
      accentField(),
    ],
    defaults: MENTORS as unknown as Record<string, unknown>[],
  },
  {
    slug: "faqs",
    label: "FAQs",
    singular: "FAQ",
    group: "Social Proof",
    kind: "collection",
    icon: "❓",
    description: "Frequently asked questions.",
    titleField: "q",
    fields: [
      { name: "q", label: "Question", type: "text", required: true },
      { name: "a", label: "Answer", type: "textarea", required: true },
    ],
    defaults: FAQS as unknown as Record<string, unknown>[],
  },

  /* ---------------- Media ---------------- */
  {
    slug: "gallery",
    label: "Gallery",
    singular: "Gallery item",
    group: "Media",
    kind: "collection",
    icon: "🖼️",
    description: "Student gallery tiles.",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      iconField(),
      accentField(),
      {
        name: "h",
        label: "Height",
        type: "select",
        half: true,
        options: [
          { value: "tall", label: "Tall" },
          { value: "mid", label: "Medium" },
          { value: "short", label: "Short" },
        ],
      },
      { name: "video", label: "Is a video?", type: "boolean", half: true },
    ],
    defaults: GALLERY as unknown as Record<string, unknown>[],
  },
  {
    slug: "reels",
    label: "Instagram Reels",
    singular: "Reel",
    group: "Media",
    kind: "collection",
    icon: "📱",
    description: "Reels carousel. Paste a Cloudinary/MP4 URL + poster image.",
    titleField: "caption",
    fields: [
      { name: "caption", label: "Caption", type: "text", required: true },
      { name: "src", label: "Video URL", type: "url", help: "Cloudinary / MP4 link. Leave blank for a placeholder card." },
      { name: "poster", label: "Poster image URL", type: "image", help: "Shown before the video plays." },
      iconField(),
      accentField(),
    ],
    defaults: REELS as unknown as Record<string, unknown>[],
  },

  /* ---------------- Site Info ---------------- */
  {
    slug: "contact",
    label: "Contact Details",
    singular: "Contact",
    group: "Site Info",
    kind: "singleton",
    icon: "📞",
    description: "Phone, email, WhatsApp, Instagram, address.",
    titleField: "email",
    fields: [
      { name: "phone", label: "Phone (display)", type: "text", half: true },
      { name: "phoneHref", label: "Phone link", type: "text", half: true, help: "tel:+91…" },
      { name: "whatsapp", label: "WhatsApp link", type: "url" },
      { name: "email", label: "Email (display)", type: "text", half: true },
      { name: "emailHref", label: "Email link", type: "text", half: true, help: "mailto:…" },
      { name: "instagram", label: "Instagram URL", type: "url", half: true },
      { name: "instagramHandle", label: "Instagram handle", type: "text", half: true },
      { name: "addressShort", label: "Short address", type: "text" },
      { name: "address", label: "Full address line", type: "textarea" },
      { name: "hours", label: "Working hours", type: "text", half: true },
      { name: "mapsSearch", label: "Google Maps link", type: "url", half: true },
    ],
    defaults: CONTACT as unknown as Record<string, unknown>,
  },
  {
    slug: "app",
    label: "Mobile App",
    singular: "App",
    group: "Site Info",
    kind: "singleton",
    icon: "📲",
    description: "ARK Kidoid app name + store links.",
    titleField: "name",
    fields: [
      { name: "name", label: "App name", type: "text" },
      { name: "playStore", label: "Google Play URL", type: "url" },
      { name: "appStore", label: "App Store URL", type: "url" },
    ],
    defaults: APP as unknown as Record<string, unknown>,
  },
];

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export const SECTION_GROUPS = Array.from(new Set(SECTIONS.map((s) => s.group)));

/** Coerce a raw form/JSON payload to the field types declared in the registry. */
export function coerce(section: Section, input: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const f of section.fields) {
    const v = input[f.name];
    if (f.type === "number") {
      out[f.name] = v === "" || v === undefined || v === null ? 0 : Number(v);
    } else if (f.type === "boolean") {
      out[f.name] = v === true || v === "true" || v === "on";
    } else {
      out[f.name] = v === undefined || v === null ? "" : String(v);
    }
  }
  return out;
}
