import Link from "next/link";
import { Phone, ArrowUpRight, Mail, Clock, Globe, ShieldCheck, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import s from "./agency.module.css";
import {
  COMPANY_ADDRESS_LINE,
  OFFICE_PHONE,
  US_PHONE,
  OFFICE_HOURS_IST,
  OFFICE_HOURS_NOTE,
  MAP_EMBED_URL,
  MAP_LINK_URL,
} from "@/data/company";
export default function AgencyContact() {
  return (
    <div className={s.site}>
      <section className={s.pageHero}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Contact us</p>
          <h1>
            Tell us what you
            <br />
            <em>have in mind.</em>
          </h1>
          <p className={s.intro}>
            A new product, a better website, or the right developer for your
            team. Share a little about what you need and we&apos;ll work out the
            next step together.
          </p>
        </div>
      </section>
      <section className={s.section}>
        <div className={`${s.wrap} ${s.hireGrid}`}>
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl tracking-tight mb-5">
              Free quote, no commitment.
            </h2>
            <p className={s.sectionText}>
              Tell us about your goals, the challenges you&apos;re facing, and
              any timeline you have in mind. We&apos;ll review your inquiry and
              get back to you with practical next steps.
            </p>
            <div className="mt-9 space-y-7">
              {[
                {
                  icon: Mail,
                  title: "Prefer email?",
                  text: "abhi@amextech.org",
                  href: "mailto:abhi@amextech.org",
                },
                {
                  icon: MapPin,
                  title: "Our Ahmedabad office",
                  text: COMPANY_ADDRESS_LINE,
                  href: MAP_LINK_URL,
                },
                {
                  icon: Phone,
                  title: "Call our Ahmedabad office",
                  text: OFFICE_PHONE.display,
                  href: `tel:${OFFICE_PHONE.tel}`,
                },
                {
                  icon: Phone,
                  title: "Call our founder in Los Angeles",
                  text: US_PHONE.display,
                  href: `tel:${US_PHONE.tel}`,
                },
                {
                  icon: Clock,
                  title: "Office hours",
                  text: `Ahmedabad office: Monday–Saturday, ${OFFICE_HOURS_IST} (${OFFICE_HOURS_NOTE}). Founder in Los Angeles: Monday–Saturday, 9am–6pm Pacific.`,
                },
                {
                  icon: Globe,
                  title: "Based in Ahmedabad, India. Founder in Los Angeles.",
                  text: "US clients get Pacific-time calls; we agree on meeting times that work for your team.",
                },
                {
                  icon: ShieldCheck,
                  title: "Your ideas stay yours",
                  text: "We can discuss an NDA before you share sensitive project details.",
                },
              ].map((item) => (
                <div className="flex gap-4" key={item.title}>
                  <item.icon
                    size={19}
                    className="mt-1 shrink-0 text-[#94712e]"
                  />
                  <div>
                    <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-[#687061] break-words hover:underline"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-sm leading-7 text-[#687061]">
                        {item.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link className={`${s.textLink} mt-8`} href="/portfolio">
              Get to know our work <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="order-1 lg:order-2 bg-white border border-[#dddfd3] rounded-lg p-5 sm:p-8">
            <h2 className="text-2xl tracking-tight mb-2">
              Send us a message.
            </h2>
            <p className="text-sm text-[#687061] mb-8">
              Fields marked * are required.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <h2 className="text-2xl tracking-tight mb-5">Find us in Ahmedabad.</h2>
          <iframe
            title="Map showing the Amex Technology office in Ahmedabad, Gujarat"
            src={MAP_EMBED_URL}
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-lg border border-[#dddfd3]"
          />
        </div>
      </section>
    </div>
  );
}
