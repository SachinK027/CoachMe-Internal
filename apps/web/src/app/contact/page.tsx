import type { Metadata } from "next";
import { siteSettings } from "@coachme/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact CoachME Advisory.",
};

export default function ContactPage() {
  return (
    <div className="surface-ivory">
      <section className="container-page section-pad">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-4 text-5xl md:text-6xl">Let’s start a conversation.</h1>
            <p className="mt-5 text-lg text-muted">
              Prefer email? Reach {siteSettings.legalName} at{" "}
              <a href={`mailto:${siteSettings.email}`} className="text-forest underline">
                {siteSettings.email}
              </a>
              .
            </p>
            <p className="mt-4 text-muted">{siteSettings.location}</p>
          </Reveal>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
