import { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : "text-left"} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="heading mt-5 text-3xl sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-base leading-relaxed text-ink/60 sm:text-lg ${
              isCenter ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
