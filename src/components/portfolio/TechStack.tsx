import s from "./portfolio.module.css";
import {
  siNextdotjs, siReact, siTypescript, siJavascript, siTailwindcss, siDrizzle, siNeon,
  siPostgresql, siReactquery, siResend, siCloudflare, siPython, siVercel, siSupabase,
  siNodedotjs, siExpress, siMongodb, siMysql, siPrisma, siFirebase, siExpo, siFigma,
  siFramer, siThreedotjs, siVite, siZod, siPhp, siMapbox, siNotion, siHtml5, siCss,
  siCurl, siStripe, type SimpleIcon,
} from "simple-icons";

// Technologies without a brand icon fall back to a letter badge.
const ICONS: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  "React Native": siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  "Drizzle ORM": siDrizzle,
  "Neon Postgres": siNeon,
  PostgreSQL: siPostgresql,
  "TanStack Query": siReactquery,
  "React Query": siReactquery,
  Resend: siResend,
  "Cloudflare R2": siCloudflare,
  Python: siPython,
  Vercel: siVercel,
  Supabase: siSupabase,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
  MySQL: siMysql,
  Prisma: siPrisma,
  Firebase: siFirebase,
  Expo: siExpo,
  Figma: siFigma,
  "Framer Motion": siFramer,
  "Three.js": siThreedotjs,
  Vite: siVite,
  Zod: siZod,
  PHP: siPhp,
  Mapbox: siMapbox,
  "Notion API": siNotion,
  HTML: siHtml5,
  CSS: siCss,
  cURL: siCurl,
  Stripe: siStripe,
};

/** Technologies that render with a brand icon; used as suggestions in the admin. */
export const KNOWN_TECH = Object.keys(ICONS);

export function TechIcon({ name }: { name: string }) {
  const icon = ICONS[name];
  if (!icon) {
    return (
      <span aria-hidden className={s.techBadge}>
        {name[0]}
      </span>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={s.techIcon}>
      <path d={icon.path} />
    </svg>
  );
}

export default function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <ul className={s.techList}>
      {technologies.map((t) => (
        <li key={t} className={s.techChip}>
          <TechIcon name={t} />
          {t}
        </li>
      ))}
    </ul>
  );
}
