"use client";

import { motion } from "framer-motion";
import { accent } from "@/lib/accents";
import { Icon, IconName } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const POSTS: {
  tag: string;
  title: string;
  read: string;
  accent: string;
  icon: IconName;
}[] = [
  {
    tag: "Parenting",
    title: "5 gentle ways to build confidence in shy children",
    read: "4 min read",
    accent: "orange",
    icon: "heart",
  },
  {
    tag: "Learning",
    title: "Why coding is the new literacy for every young mind",
    read: "6 min read",
    accent: "grape",
    icon: "code",
  },
  {
    tag: "Wellbeing",
    title: "How chess quietly sharpens focus and patience",
    read: "5 min read",
    accent: "sky",
    icon: "chess",
  },
];

export function Blog() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="From the Blog"
            title={
              <>
                Ideas for curious <span className="text-gradient">parents & kids</span>
              </>
            }
            subtitle="Practical tips, stories and inspiration from our mentors and community."
          />
          <Reveal delay={0.1}>
            <a href="#" className="btn-ghost shrink-0">
              Read all articles <Icon name="arrow" size={16} />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {POSTS.map((p, i) => {
            const a = accent(p.accent);
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <motion.a
                  href="#"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="card group flex h-full flex-col hover:shadow-soft-lg"
                >
                  <div className={`relative flex h-40 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${a.grad}`}>
                    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,white_2px,transparent_2px)] [background-size:32px_32px]" />
                    <Icon name={p.icon} size={48} className="text-white/90" />
                  </div>
                  <span className={`mt-5 w-fit rounded-full ${a.tint} ${a.text} px-3 py-1 text-xs font-bold`}>
                    {p.tag}
                  </span>
                  <h3 className="heading mt-3 text-lg leading-snug">{p.title}</h3>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/50">
                      <Icon name="clock" size={14} /> {p.read}
                    </span>
                    <span className={`flex items-center gap-1 text-sm font-bold ${a.text} transition-all group-hover:gap-2`}>
                      Read <Icon name="arrow" size={15} />
                    </span>
                  </div>
                </motion.a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
