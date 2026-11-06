import type { Metadata } from "next";
import Image from "next/image";
import { workshops } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate, formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Upcoming and past CoachME Advisory workshops.",
};

export default function WorkshopsPage() {
  const upcoming = workshops.filter((item) => item.status === "upcoming");
  const past = workshops.filter((item) => item.status === "past");

  return (
    <div className="surface-ivory">
      <section className="container-page section-pad">
        <Breadcrumbs items={[{ label: "Workshops" }]} />
        <Reveal>
          <p className="eyebrow">Workshops</p>
          <h1 className="display mt-4 max-w-4xl text-5xl md:text-6xl">
            Practical workshops for clearer communication.
          </h1>
        </Reveal>

        <WorkshopGroup title="Upcoming" items={upcoming} />
        {past.length ? <WorkshopGroup title="Past" items={past} /> : null}
      </section>
    </div>
  );
}

function WorkshopGroup({
  title,
  items,
}: {
  title: string;
  items: typeof workshops;
}) {
  return (
    <div className="mt-14">
      <h2 className="display text-3xl">{title}</h2>
      <div className="mt-8 grid gap-8">
        {items.map((workshop, index) => (
          <Reveal key={workshop.slug} delay={index * 0.05}>
            <article className="grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[16rem]">
                <Image src={workshop.image} alt={workshop.title} fill className="object-cover" />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-muted">
                  <span>{workshop.format}</span>
                  <span>·</span>
                  <span>{workshop.language}</span>
                  <span>·</span>
                  <span>{workshop.duration}</span>
                </div>
                <h3 className="display mt-4 text-3xl md:text-4xl">{workshop.title}</h3>
                <p className="mt-3 text-muted">{workshop.shortDescription}</p>
                <div className="mt-5 grid gap-2 text-sm text-forest md:grid-cols-2">
                  <p>{formatDate(workshop.startDate)}</p>
                  <p>{workshop.timeLabel}</p>
                  <p>
                    {formatMoney(workshop.price, workshop.currency)}
                    {workshop.priceNote ? ` (${workshop.priceNote})` : ""}
                  </p>
                  <p>
                    {workshop.availableSeats} of {workshop.maxParticipants} seats available
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`/workshops/${workshop.slug}`}>View workshop</Button>
                  <Button href={`/booking/${workshop.slug}`} variant="secondary">
                    Register interest
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
