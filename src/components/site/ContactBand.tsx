import Link from "next/link";
import { ArrowUpRight, FileText, Mail, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { OFFICE_PHONE } from "@/data/company";
import s from "./inner.module.css";

/** The shared closing section for inner pages: three easy ways to start a conversation. */
export default function ContactBand({
  title = "Have a project in mind?",
  text = "Tell us what you are working on. We will reply with a plan and a clear written quote, with no obligation.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className={s.band}>
      <div className={s.wrap}>
        <Reveal className={s.bandCard}>
          <div className={s.bandText}>
            <h2 className={s.h2}>{title}</h2>
            <p className={s.sub}>{text}</p>
            <div className={s.bandActions}>
              <Link href="/contact" className={s.dark}>
                Start a project <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/portfolio" className={s.ghost}>
                See our work
              </Link>
            </div>
          </div>
          <ul className={s.ways}>
            <li>
              <Link href="/contact" className={s.way}>
                <span className={s.wayIcon}>
                  <FileText size={20} aria-hidden="true" />
                </span>
                <span>
                  <strong>Send a project brief</strong>
                  <small>Takes about two minutes</small>
                </span>
              </Link>
            </li>
            <li>
              <a href="mailto:abhi@amextech.org" className={s.way}>
                <span className={s.wayIcon}>
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span>
                  <strong>Email us</strong>
                  <small>abhi@amextech.org</small>
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:${OFFICE_PHONE.tel}`} className={s.way}>
                <span className={s.wayIcon}>
                  <Phone size={20} aria-hidden="true" />
                </span>
                <span>
                  <strong>Call us</strong>
                  <small>{OFFICE_PHONE.display}</small>
                </span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
