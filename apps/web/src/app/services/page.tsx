import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business operations advisory, teams advisory and workshops, 1:1 exclusive advisory, and strategic introduction calls.",
};

export default function ServicesPage() {
  return (
    <div className="surface-ivory">
      <section className="container-page section-pad">
        <Breadcrumbs items={[{ label: "Services" }]} />
        <Reveal>
          <p className="eyebrow">Services</p>
          <h1 className="display mt-4 max-w-4xl text-5xl md:text-6xl">
            Ways we can work together.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Private advisory for leaders, teams and businesses — diagnose first, then intervene.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <article className="grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-[1fr_1.1fr]">
                <div className="relative min-h-[18rem]">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <h2 className="display text-3xl md:text-4xl">{service.title}</h2>
                    <p className="mt-4 text-muted leading-relaxed">{service.shortDescription}</p>
                    {service.priceLabel ? (
                      <p className="mt-4 text-sm font-semibold text-forest">
                        {service.priceLabel}
                        {service.duration ? ` · ${service.duration}` : ""}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={`/services/${service.slug}`}>View details</Button>
                    {service.bookable ? (
                      <Button href={`/booking/${service.slug}`} variant="secondary">
                        Book
                      </Button>
                    ) : (
                      <Link
                        href="/booking/strategic-introduction-call"
                        className="self-center text-sm font-semibold text-forest underline-offset-4 hover:underline"
                      >
                        Start with an introduction call
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
