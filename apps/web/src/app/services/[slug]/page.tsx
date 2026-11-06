import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getRelatedServices, getServiceBySlug, services } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo.title.replace(" | CoachME Advisory", ""),
    description: service.seo.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.relatedSlugs);

  return (
    <div className="surface-ivory">
      <section className="relative overflow-hidden surface-forest grain">
        <div className="absolute inset-0 opacity-35">
          <Image src={service.image} alt="" fill className="object-cover" priority />
        </div>
        <div className="container-page relative z-10 section-pad">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <p className="eyebrow text-champagne before:bg-champagne">Service</p>
          <h1 className="display mt-4 max-w-4xl text-5xl text-ivory md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/80">{service.heroDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {service.bookable ? (
              <Button href={`/booking/${service.slug}`} variant="inverse">
                Book now
              </Button>
            ) : (
              <Button href="/booking/strategic-introduction-call" variant="inverse">
                Book Introduction Call
              </Button>
            )}
            {service.priceLabel ? (
              <p className="self-center rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory">
                {service.priceLabel}
                {service.priceNote ? ` · ${service.priceNote}` : ""}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="container-page section-pad grid gap-16">
        <Reveal>
          <h2 className="display text-3xl">Who it is for</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted">{service.audience}</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="display text-3xl">Challenges addressed</h2>
            <ul className="mt-5 space-y-3">
              {service.challenges.map((item) => (
                <li key={item} className="border-l-2 border-champagne pl-4 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-3xl">Benefits and outcomes</h2>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((item) => (
                <li key={item} className="border-l-2 border-sage pl-4 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="display text-3xl">Approach and methodology</h2>
          <div className="mt-5 space-y-4">
            {service.approach.map((item) => (
              <p key={item} className="max-w-3xl leading-relaxed text-muted">
                {item}
              </p>
            ))}
          </div>
        </Reveal>

        {service.faq.length ? (
          <Reveal>
            <h2 className="display text-3xl">FAQ</h2>
            <div className="mt-6 space-y-4">
              {service.faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-line bg-white p-5 open:shadow-sm"
                >
                  <summary className="cursor-pointer font-semibold text-forest">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        ) : null}

        {related.length ? (
          <div>
            <h2 className="display text-3xl">Related services</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <a
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="rounded-2xl border border-line bg-white p-6 transition hover:border-forest/30"
                >
                  <h3 className="display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.shortDescription}</p>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
