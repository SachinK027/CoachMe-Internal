import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookableOfferings, getBookableBySlug } from "@coachme/content";
import { BookingExperience } from "@/components/booking/BookingExperience";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return bookableOfferings.map((offering) => ({ slug: offering.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offering = getBookableBySlug(slug);
  if (!offering) return {};
  return {
    title: `Book ${offering.title}`,
    description: offering.summary,
  };
}

export default async function BookingPage({ params }: Props) {
  const { slug } = await params;
  const offering = getBookableBySlug(slug);
  if (!offering) notFound();

  return (
    <div className="surface-ivory">
      <section className="container-page section-pad">
        <Breadcrumbs
          items={[
            { label: offering.type === "workshop" ? "Workshops" : "Services", href: offering.type === "workshop" ? "/workshops" : "/services" },
            { label: offering.title, href: `/${offering.type === "workshop" ? "workshops" : "services"}/${offering.slug}` },
            { label: "Booking" },
          ]}
        />
        <p className="eyebrow">Booking</p>
        <h1 className="display mt-4 max-w-4xl text-5xl md:text-6xl">{offering.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{offering.summary}</p>
        <p className="mt-3 rounded-full border border-champagne/50 bg-white px-4 py-2 text-sm text-forest inline-flex">
          Local demo · no payment · no email/ICS until API phase
        </p>
        <div className="mt-12">
          <BookingExperience offering={offering} />
        </div>
      </section>
    </div>
  );
}
