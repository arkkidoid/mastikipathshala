# Masti Ki Paathshaala — Learn & Lead

A premium, kid-friendly marketing website for the Masti Ki Paathshaala learning academy, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Highlights

- Emotional hero with floating educational elements (Robotics, Chess, Coding, Music, Dance, Painting, Storytelling)
- Sticky navbar — transparent on top, glassy & solid on scroll, with a mobile menu
- 9 program cards, Why-Choose-Us features, 5-step Learning Journey timeline
- Animated success-metric counters
- Masonry student gallery with lightbox (photos + videos)
- Sliding testimonials carousel · mentor profiles · events
- Awards / partner schools · brochure download · interactive FAQ · blog · Instagram feed
- Stunning "Book Free Trial" CTA + full admission enquiry form with embedded map
- Floating WhatsApp, sticky mobile Book-Trial bar, back-to-top
- Fully responsive, accessible (skip link, focus rings, ARIA, reduced-motion support)

## 🎨 Design system

- **Palette:** warm off-white background, pure-white cards, brand orange + warm yellow, sky blue, mint, soft purple, deep-navy ink (from the logo)
- **Type:** Poppins (display) + Inter (body)
- All content lives in **`lib/data.ts`** — edit programs, testimonials, events, mentors, FAQs, and contact details in one place.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## 📁 Structure

```
app/          layout, page, global styles
components/    all sections (Hero, Programs, Gallery, …)
components/ui  Icon set, Reveal (scroll animations), SectionHeading
lib/          data.ts (content) + accents.ts (color maps)
public/       mkplogo.png
```

> Illustrations use the brand mascot + custom SVG icon set and gradient art (no external image dependencies). Swap the gradient gallery/blog tiles for real photography by dropping images into `public/` and updating the respective components.
