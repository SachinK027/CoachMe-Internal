import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles on leadership, teams and communication from CoachME Advisory.",
};

export default function BlogPage() {
  const [featured, ...rest] = [...blogPosts].sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1,
  );

  return (
    <div className="surface-ivory">
      <section className="container-page section-pad">
        <Breadcrumbs items={[{ label: "Insights" }]} />
        <Reveal>
          <p className="eyebrow">Insights</p>
          <h1 className="display mt-4 max-w-4xl text-5xl md:text-6xl">
            Thinking for leaders under pressure.
          </h1>
        </Reveal>

        {featured ? (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-12 grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative min-h-[18rem]">
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  Featured · {formatDate(featured.publishedAt)} · {featured.readingTimeMinutes} min
                </p>
                <h2 className="display mt-4 text-3xl md:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-muted">{featured.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {post.category} · {formatDate(post.publishedAt)}
                    </p>
                    <h2 className="display mt-3 text-2xl leading-tight">{post.title}</h2>
                    <p className="mt-3 text-sm text-muted line-clamp-3">{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
