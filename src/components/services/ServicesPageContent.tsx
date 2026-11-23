import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AiAgentFeature,
  ServiceGrid,
  HirePreview,
  Process,
} from "@/components/agency/AgencySections";
import s from "@/components/agency/agency.module.css";
export default function ServicesPageContent() {
  return (
    <div className={s.site}>
      <section className={s.pageHero}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>From possibility to product</p>
          <h1>
            Your goals.
            <br />
            <em>Our team to deliver them.</em>
          </h1>
          <p className={s.intro}>
            We bring design, development, AI, and online marketing together
            in one team to help you build useful products and reach more
            customers.
          </p>
          <div className={s.actions}>
            <Link href="/contact" className={s.button}>
              Find the right solution <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={s.wrap}>
          <ServiceGrid full />
          <AiAgentFeature />
        </div>
      </section>
      <HirePreview />
      <section className={s.section} style={{ background: "#eeeee4" }}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>How we work</p>
          <h2 className={s.heading}>
            Good process.
            <br />
            <em>Better outcomes.</em>
          </h2>
          <Process />
        </div>
      </section>
    </div>
  );
}
