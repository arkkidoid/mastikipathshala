import { SVGProps } from "react";

export type IconName =
  | "robot"
  | "code"
  | "chess"
  | "music"
  | "dance"
  | "art"
  | "story"
  | "mic"
  | "shield"
  | "mentor"
  | "users"
  | "hands"
  | "sparkle"
  | "heart"
  | "activity"
  | "arrow"
  | "arrowUp"
  | "star"
  | "phone"
  | "whatsapp"
  | "mail"
  | "map"
  | "menu"
  | "close"
  | "quote"
  | "chevron"
  | "play"
  | "check"
  | "clock"
  | "calendar"
  | "compass"
  | "trophy"
  | "flag"
  | "download"
  | "instagram"
  | "facebook"
  | "youtube"
  | "plus";

const paths: Record<IconName, React.ReactNode> = {
  robot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 5v3M9 13h.01M15 13h.01M9 16h6" />
      <path d="M3 12v2M21 12v2" />
      <circle cx="12" cy="4" r="1" />
    </>
  ),
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13 4l-2 16" />,
  chess: (
    <>
      <path d="M8 20h8M9 20l.5-4h5l.5 4" />
      <path d="M9.5 16c-1-2-1-3-.5-5M14.5 16c1-2 1-3 .5-5" />
      <path d="M12 4c-2 0-3.2 1.3-3.2 2.8 0 1 .6 1.7 1.4 2.2M12 4c1.6 0 2.6 1 2.9 2" />
      <path d="M9 9c1 .8 2 1 3 1s2-.2 3-1" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v11" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="15" r="3" />
    </>
  ),
  dance: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M12 7c-1 2-3 2.5-4.5 2M12 7c1 2 2.5 3 4.5 3" />
      <path d="M12 7v6M12 13l-3 6M12 13l3 6" />
    </>
  ),
  art: (
    <>
      <path d="M12 3a9 9 0 100 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.8 1.8-1.8H16a5 5 0 005-5c0-3.9-4-7-9-7z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="11" cy="7.5" r="1" />
      <circle cx="15" cy="8.5" r="1" />
    </>
  ),
  story: (
    <>
      <path d="M12 6c-2-1.3-4-1.5-7-1v13c3-.5 5-.3 7 1 2-1.3 4-1.5 7-1V5c-3-.5-5-.3-7 1z" />
      <path d="M12 6v13" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0012 0M12 17v4M9 21h6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  mentor: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.3 3-6 7-6s7 2.7 7 6" />
      <path d="M12 2.5l1.2 1.6M12 2.5L10.8 4.1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 5.5a3 3 0 010 5.4M17 15c2.3.5 4 2.3 4 5" />
    </>
  ),
  hands: (
    <>
      <path d="M4 12l3-1 5 2 3-4 5 3" />
      <path d="M4 12v4a4 4 0 004 4h6a4 4 0 004-4v-3" />
    </>
  ),
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  ),
  heart: (
    <path d="M12 20s-7-4.3-9.3-8.4C1 8.5 2.6 5 6 5c2 0 3.2 1.1 4 2.3C10.8 6.1 12 5 14 5c3.4 0 5 3.5 3.3 6.6C19 15.7 12 20 12 20z" />
  ),
  activity: <path d="M3 12h4l2 6 4-14 2 8h6" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 20V5M6 11l6-6 6 6" />,
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9L12 3.5z" />
  ),
  phone: (
    <path d="M6 3h3l1.5 5-2 1.5a11 11 0 005 5l1.5-2 5 1.5v3a2 2 0 01-2.2 2A16 16 0 014 5.2 2 2 0 016 3z" />
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3z" />
      <path d="M8.5 8.5c-.3 1 .2 2.4 1.4 3.6s2.6 1.7 3.6 1.4c.5-.2.8-.9.9-1.4.05-.3-.1-.5-.4-.6l-1.3-.6c-.3-.1-.5 0-.7.2l-.4.5c-.7-.3-1.4-1-1.7-1.7l.5-.4c.2-.2.3-.4.2-.7l-.6-1.3c-.1-.3-.3-.45-.6-.4-.5.1-1.2.4-1.4.9z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  map: (
    <>
      <path d="M12 21c4-4.5 6-7.6 6-10.5A6 6 0 006 10.5C6 13.4 8 16.5 12 21z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  quote: (
    <path d="M9 7c-2.5 1-4 3-4 6h3v4H4v-4c0-4 2-7 5-8v2zM19 7c-2.5 1-4 3-4 6h3v4h-4v-4c0-4 2-7 5-8v2z" />
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  play: <path d="M8 5l11 7-11 7V5z" />,
  check: <path d="M5 12l5 5 9-11" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2.5" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 01-10 0V4z" />
      <path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M10 14h4M9 20h6M12 14v3" />
    </>
  ),
  flag: <path d="M6 21V4M6 4c3-1.5 6 1.5 9 0v7c-3 1.5-6-1.5-9 0" />,
  download: <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" />
    </>
  ),
  facebook: (
    <path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.6.4-1 1-1z" />
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10 9l5 3-5 3V9z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
};

const filled: Partial<Record<IconName, boolean>> = {
  sparkle: true,
  star: true,
  quote: true,
  play: true,
  heart: true,
  facebook: true,
};

export function Icon({
  name,
  size = 24,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  const isFilled = filled[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
