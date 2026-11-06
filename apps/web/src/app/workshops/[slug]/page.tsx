import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkshopBySlug, workshops } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate, formatMoney } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workshops.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);
  if (!workshop) return {};
  return {
    title: workshop.seo.title.replace(" | CoachME Advisory", ""),
    description: workshop.seo.description,
  };
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params;
  const workshop = getWorkshopBySlug(slug);
  if (!workshop) notFound();

  return (
    <div className="surface-ivory">
      <section className="relative overflow-hidden surface-forest grain">
        <div className="absolute inset-0 opacity-30">
          <Image src={workshop.image} alt="" fill className="object-cover" priority />
        </div>
        <div className="container-page relative z-10 section-pad">
          <Breadcrumbs
            items={[
              { label: "Workshops", href: "/workshops" },
              { label: workshop.title },
            ]}
          />
          <p className="eyebrow text-champagne before:bg-champagne">
            {workshop.format} · {workshop.language}
          </p>
          <h1 className="display mt-4 max-w-4xl text-5xl text-ivory md:text-6xl">
            {workshop.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/80">{workshop.shortDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/booking/${workshop.slug}`} variant="inverse">
              Register interest
            </Button>
            <p className="self-center rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory">
              {formatMoney(workshop.price, workshop.currency)} · display only, no online payment
            </p>
          </div>
        </div>
      </section>

      <section className="container-page section-pad grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <Reveal>
            <h2 className="display text-3xl">Workshop description</h2>
            <p className="mt-4 leading-relaxed text-muted">{workshop.description}</p>
          </Reveal>
          <Reveal>
            <h2 className="display text-3xl">Learning outcomes</h2>
            <ul className="mt-4 space-y-3">
              {workshop.learningOutcomes.map((item) => (
                <li key={item} className="border-l-2 border-champagne pl-4 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="display text-3xl">Audience</h2>
            <p className="mt-4 text-muted">{workshop.audience}</p>
          </Reveal>
          <Reveal>
            <h2 className="display text-3xl">Facilitator</h2>
            <p className="mt-4 text-muted">{workshop.facilitator}</p>
          </Reveal>
          <Reveal>
            <h2 className="display text-3xl">Cancellation policy</h2>
            <p className="mt-4 text-muted">{workshop.cancellationPolicy}</p>
          </Reveal>
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-line bg-white p-8">
          <h2 className="display text-2xl">Schedule</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-muted">Date</dt>
              <dd className="mt-1 font-semibold text-forest">
                {formatDate(workshop.startDate)}
                {workshop.endDate !== workshop.startDate
                  ? ` – ${formatDate(workshop.endDate)}`
                  : ""}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Time</dt>
              <dd className="mt-1 font-semibold text-forest">{workshop.timeLabel}</dd>
            </div>
            <div>
              <dt className="text-muted">Duration</dt>
              <dd className="mt-1 font-semibold text-forest">{workshop.duration}</dd>
            </div>
            <div>
              <dt className="text-muted">Availability</dt>
              <dd className="mt-1 font-semibold text-forest">
                {workshop.availableSeats} / {workshop.maxParticipants} seats
              </dd>
            </div>
            <div>
              <dt className="text-muted">Price</dt>
              <dd className="mt-1 font-semibold text-forest">
                {formatMoney(workshop.price, workshop.currency)}
                {workshop.priceNote ? ` (${workshop.priceNote})` : ""}
              </dd>
            </div>
          </dl>
          <Button href={`/booking/${workshop.slug}`} className="mt-8 w-full">
            Register interest
          </Button>
        </aside>
      </section>
    </div>
  );
}
