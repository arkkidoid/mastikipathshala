import type { IconName } from "@/components/ui/Icon";

export type Accent = "orange" | "sun" | "sky" | "mint" | "grape" | "rose";

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Programs", href: "/#programs" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Events", href: "/#events" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export type Program = {
  title: string;
  icon: IconName;
  accent: Accent;
  desc: string;
  age: string;
  duration: string;
};

export const PROGRAMS: Program[] = [
  {
    title: "Robotics",
    icon: "robot",
    accent: "sky",
    desc: "Build & program real robots — sensors, motors and logic that spark engineering minds.",
    age: "7–16 yrs",
    duration: "12 weeks",
  },
  {
    title: "Coding & AI",
    icon: "code",
    accent: "grape",
    desc: "From block coding to Python & AI projects, kids create apps, games and smart machines.",
    age: "6–16 yrs",
    duration: "16 weeks",
  },
  {
    title: "Chess",
    icon: "chess",
    accent: "ink" as Accent,
    desc: "Strategic thinking, focus and patience — taught by rated coaches, one move at a time.",
    age: "5–16 yrs",
    duration: "Ongoing",
  },
  {
    title: "Dance",
    icon: "dance",
    accent: "rose",
    desc: "Bollywood, Hip-Hop & Contemporary — rhythm, expression and joyful stage confidence.",
    age: "4–16 yrs",
    duration: "Ongoing",
  },
  {
    title: "Music",
    icon: "music",
    accent: "orange",
    desc: "Vocals, keyboard & percussion — discover melody, tempo and the fun of performing.",
    age: "4–16 yrs",
    duration: "Ongoing",
  },
  {
    title: "Art & Craft",
    icon: "art",
    accent: "sun",
    desc: "Colour, sketching, clay & DIY crafts that grow imagination and fine motor skills.",
    age: "3–14 yrs",
    duration: "8 weeks",
  },
  {
    title: "Storytelling",
    icon: "story",
    accent: "mint",
    desc: "Narration, drama & creative writing that build vocabulary, empathy and imagination.",
    age: "3–12 yrs",
    duration: "6 weeks",
  },
  {
    title: "Public Speaking",
    icon: "mic",
    accent: "sky",
    desc: "Stage presence, debate & communication that turn shy voices into confident leaders.",
    age: "7–16 yrs",
    duration: "10 weeks",
  },
  {
    title: "Self Defence",
    icon: "shield",
    accent: "mint",
    desc: "Karate-based safety skills that build strength, discipline and everyday confidence.",
    age: "5–16 yrs",
    duration: "Ongoing",
  },
];

export const FEATURES: {
  title: string;
  icon: IconName;
  accent: Accent;
  desc: string;
}[] = [
  {
    title: "Experienced Mentors",
    icon: "mentor",
    accent: "orange",
    desc: "Certified, background-verified teachers who genuinely love working with children.",
  },
  {
    title: "Small Batch Sizes",
    icon: "users",
    accent: "sky",
    desc: "Max 8 children per batch so every child gets attention, feedback and encouragement.",
  },
  {
    title: "Hands-on Learning",
    icon: "hands",
    accent: "mint",
    desc: "Learning by doing — real projects, real tools and real play, not rote memorisation.",
  },
  {
    title: "Creative Environment",
    icon: "sparkle",
    accent: "grape",
    desc: "Bright, safe and playful spaces designed to make curiosity feel completely natural.",
  },
  {
    title: "Confidence Building",
    icon: "heart",
    accent: "rose",
    desc: "Regular stage time, showcases and gentle mentoring that help kids believe in themselves.",
  },
  {
    title: "Practical Activities",
    icon: "activity",
    accent: "sun",
    desc: "Every concept ends in a project, performance or creation the child can proudly show.",
  },
];

// NOTE: modest placeholder figures — update with your real numbers anytime.
export const METRICS = [
  { value: 250, suffix: "+", label: "Students Enrolled" },
  { value: 9, suffix: "", label: "Signature Courses" },
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 20, suffix: "+", label: "Events Conducted" },
  { value: 12, suffix: "+", label: "Certified Mentors" },
];

export const JOURNEY: {
  step: string;
  icon: IconName;
  accent: Accent;
  desc: string;
}[] = [
  {
    step: "Discover",
    icon: "compass",
    accent: "sky",
    desc: "A free trial helps your child explore interests and find what truly excites them.",
  },
  {
    step: "Learn",
    icon: "sparkle",
    accent: "grape",
    desc: "Expert mentors introduce concepts through play, stories and hands-on activities.",
  },
  {
    step: "Practice",
    icon: "activity",
    accent: "mint",
    desc: "Guided projects and weekly challenges turn new skills into confident habits.",
  },
  {
    step: "Perform",
    icon: "star",
    accent: "sun",
    desc: "Showcases, competitions and recitals give every child a real stage to shine on.",
  },
  {
    step: "Lead",
    icon: "trophy",
    accent: "orange",
    desc: "Children mentor peers, lead teams and step into the world with lasting confidence.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  accent: Accent;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "My daughter went from being shy to hosting her school annual day. The public speaking mentors are magical — the change is real.",
    name: "Priya Sharma",
    role: "Mother of Aanya, 9",
    rating: 5,
    accent: "orange",
    initials: "PS",
  },
  {
    quote:
      "The robotics program is world-class. My son built his first line-following robot in 8 weeks and now dreams of becoming an engineer.",
    name: "Rahul Mehta",
    role: "Father of Vivaan, 11",
    rating: 5,
    accent: "sky",
    initials: "RM",
  },
  {
    quote:
      "Small batches make all the difference. The mentors know exactly where my child needs help. Best decision we made this year.",
    name: "Sneha Kulkarni",
    role: "Mother of Kabir, 7",
    rating: 5,
    accent: "mint",
    initials: "SK",
  },
  {
    quote:
      "Safe, warm and genuinely fun. My twins actually ask to go to class! The chess coaching improved their focus at school too.",
    name: "Arjun Nair",
    role: "Father of Meera & Riya, 8",
    rating: 5,
    accent: "grape",
    initials: "AN",
  },
  {
    quote:
      "From dance recitals to art exhibitions, they give children real stages. Watching my daughter perform with confidence was priceless.",
    name: "Fatima Khan",
    role: "Mother of Zoya, 10",
    rating: 5,
    accent: "rose",
    initials: "FK",
  },
  {
    quote:
      "The mentors treat every child like their own. Masti Ki Paathshaala truly lives up to its name — learning here feels like play.",
    name: "Vikram Desai",
    role: "Father of Aarav, 6",
    rating: 5,
    accent: "sun",
    initials: "VD",
  },
];

export type EventItem = {
  tag: string;
  title: string;
  date: string;
  desc: string;
  accent: Accent;
  icon: IconName;
};

export const EVENTS: EventItem[] = [
  {
    tag: "Workshop",
    title: "AI & Robotics Weekend Bootcamp",
    date: "Jul 19–20, 2026",
    desc: "A two-day hands-on lab where kids build and code their very own smart robot.",
    accent: "sky",
    icon: "robot",
  },
  {
    tag: "Summer Camp",
    title: "Summer of Creativity Camp",
    date: "May 5 – Jun 15, 2026",
    desc: "Six weeks of art, music, coding and drama — one unforgettable summer of fun.",
    accent: "sun",
    icon: "sparkle",
  },
  {
    tag: "Competition",
    title: "Junior Chess Championship",
    date: "Aug 9, 2026",
    desc: "An inter-academy tournament with rated rounds, trophies and grandmaster guests.",
    accent: "grape",
    icon: "chess",
  },
  {
    tag: "Holiday Program",
    title: "Diwali Art & Craft Festival",
    date: "Oct 24–28, 2026",
    desc: "Festive DIY décor, diya painting and storytelling to celebrate the season of lights.",
    accent: "orange",
    icon: "art",
  },
];

export type Mentor = {
  name: string;
  subject: string;
  exp: string;
  accent: Accent;
  initials: string;
};

export const MENTORS: Mentor[] = [
  {
    name: "Ananya Rao",
    subject: "Robotics & AI Lead",
    exp: "9 yrs • IIT alumna",
    accent: "sky",
    initials: "AR",
  },
  {
    name: "Karan Malhotra",
    subject: "Chess Master Coach",
    exp: "FIDE rated • 12 yrs",
    accent: "grape",
    initials: "KM",
  },
  {
    name: "Divya Menon",
    subject: "Performing Arts Head",
    exp: "Kathak & Music • 10 yrs",
    accent: "rose",
    initials: "DM",
  },
  {
    name: "Rohan Gupta",
    subject: "Public Speaking Mentor",
    exp: "TEDx speaker • 7 yrs",
    accent: "orange",
    initials: "RG",
  },
];

export const FAQS = [
  {
    q: "Who can join?",
    a: "We welcome learners of all ages — from young children to teens and adults. Every program is grouped by age and skill so everyone learns at just the right pace.",
  },
  {
    q: "How does the free trial work?",
    a: "Book a free trial for any program. Your child attends a real class, meets the mentor, and you decide afterwards — no pressure, no payment upfront.",
  },
  {
    q: "How big are the batches?",
    a: "We cap every batch at 8 children. Small groups mean personal attention, faster progress and a happier, more confident child.",
  },
  {
    q: "Are the mentors verified?",
    a: "Yes. All mentors are certified in their subject and background-verified. Safety and trust come before everything else at Masti Ki Paathshaala.",
  },
  {
    q: "Can my child join more than one program?",
    a: "Absolutely! Many children mix, say, coding with dance or chess with art. We offer flexible schedules and family discounts for multiple enrolments.",
  },
  {
    q: "Do you offer online classes?",
    a: "We offer both in-centre and live online classes for select programs like Coding, Public Speaking and Chess, so learning never has to pause.",
  },
];

export const GALLERY: {
  title: string;
  accent: Accent;
  icon: IconName;
  h: "tall" | "mid" | "short";
  video?: boolean;
}[] = [
  { title: "Robotics Lab Day", accent: "sky", icon: "robot", h: "tall" },
  { title: "Annual Dance Recital", accent: "rose", icon: "dance", h: "mid", video: true },
  { title: "Young Coders Meetup", accent: "grape", icon: "code", h: "short" },
  { title: "Chess Tournament", accent: "ink" as Accent, icon: "chess", h: "mid" },
  { title: "Art Exhibition", accent: "sun", icon: "art", h: "tall" },
  { title: "Music Showcase", accent: "orange", icon: "music", h: "short", video: true },
  { title: "Storytelling Circle", accent: "mint", icon: "story", h: "mid" },
  { title: "Speak-Up Stage", accent: "sky", icon: "mic", h: "short" },
];

export type Partner = {
  name: string;
  category: string;
  logo?: string; // image URL; falls back to a monogram tile if empty
  url?: string;
  accent: Accent;
};

export const PARTNERS: Partner[] = [
  { name: "Sunrise Public School", category: "School", accent: "orange", url: "", logo: "" },
  { name: "Green Valley Academy", category: "School", accent: "mint", url: "", logo: "" },
  { name: "Little Scholars", category: "Institution", accent: "sky", url: "", logo: "" },
  { name: "Bright Minds International", category: "Institution", accent: "grape", url: "", logo: "" },
  { name: "St. Xavier's Prep", category: "School", accent: "rose", url: "", logo: "" },
  { name: "TechKids Foundation", category: "NGO", accent: "sun", url: "", logo: "" },
];

// Mobile app. TODO: replace appStore with the real listing once published on iOS.
export const APP = {
  name: "ARK Kidoid",
  playStore: "https://play.google.com/store/apps/details?id=com.arkkidoid.app",
  appStore: "https://apps.apple.com/search?term=ARK+Kidoid",
};

// Instagram Reels carousel.
// `src` = video URL (Cloudinary/MP4). `poster` = preview image URL.
// Leave both undefined to render a branded placeholder card — the layout never breaks.
export type Reel = {
  id: string;
  src?: string;
  poster?: string;
  caption: string;
  accent: Accent;
  icon: IconName;
};

export const REELS: Reel[] = [
  { id: "r1", caption: "Robotics lab in action", accent: "sky", icon: "robot" },
  { id: "r2", caption: "Annual dance recital", accent: "rose", icon: "dance" },
  { id: "r3", caption: "Young coders at work", accent: "grape", icon: "code" },
  { id: "r4", caption: "Little artists, big ideas", accent: "sun", icon: "art" },
  { id: "r5", caption: "Chess champions rising", accent: "mint", icon: "chess" },
  { id: "r6", caption: "Music & rhythm class", accent: "orange", icon: "music" },
  { id: "r7", caption: "Speak-up on stage", accent: "sky", icon: "mic" },
];

export const CONTACT = {
  phone: "+91 98800 53702",
  phoneHref: "tel:+919880053702",
  whatsapp: "https://wa.me/919880053702",
  email: "admin@arkkidoid.in",
  emailHref: "mailto:admin@arkkidoid.in",
  instagram: "https://www.instagram.com/masti_ki_paathshaala",
  instagramHandle: "@masti_ki_paathshaala",
  appName: "ARK Kidoid",
  address: "Multiple branches — call or WhatsApp us for directions to your nearest centre.",
  addressShort: "Branches across the city",
  mapsSearch: "https://www.google.com/maps/search/Masti+Ki+Paathshaala",
  hours: "Mon–Sat · 9:00 AM – 7:00 PM",
};

export type ContactInfo = typeof CONTACT;
export type AppInfo = typeof APP;
