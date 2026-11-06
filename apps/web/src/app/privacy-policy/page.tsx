import type { Metadata } from "next";
import { privacyPolicy } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: "CoachME Advisory privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="surface-ivory">
      <section className="container-page section-pad max-w-4xl">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
        <h1 className="display text-5xl">{privacyPolicy.title}</h1>
        <p className="mt-3 text-muted">Last updated: {privacyPolicy.updatedAt}</p>
        <div className="mt-10 space-y-10">
          {privacyPolicy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="display text-2xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-3 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
