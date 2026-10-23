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
      <span aria-hidden className="grid place-items-center w-5 h-5 rounded-md bg-slate-900 text-[10px] font-semibold text-white">
        {name[0]}
      </span>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="w-5 h-5" fill={`#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}

export default function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {technologies.map((t) => (
        <li
          key={t}
          className="inline-flex items-center gap-2.5 rounded-full bg-white pl-2.5 pr-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        >
          <TechIcon name={t} />
          {t}
        </li>
      ))}
    </ul>
  );
}
