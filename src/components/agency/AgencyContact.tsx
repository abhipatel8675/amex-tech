import Link from "next/link";
import { Phone, ArrowUpRight, Mail, Clock, Globe, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import s from "./agency.module.css";
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
                  icon: Phone,
                  title: "Prefer to call?",
                  text: "+1 (623) 301-2035",
                  href: "tel:+16233012035",
                },
                {
                  icon: Clock,
                  title: "Our working hours",
                  text: "Monday–Saturday, 9am–6pm Pacific time",
                },
                {
                  icon: Globe,
                  title: "Los Angeles founder. Team in India.",
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
                        className="text-sm text-[#687061] break-all hover:underline"
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
    </div>
  );
}
