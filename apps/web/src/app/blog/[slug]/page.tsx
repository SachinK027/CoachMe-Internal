import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo.title.replace(" | CoachME Advisory", ""),
    description: post.seo.description,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug);

  const shareUrl = `http://localhost:3000/blog/${post.slug}`;

  return (
    <article className="surface-ivory">
      <section className="container-page section-pad pb-8">
        <Breadcrumbs
          items={[
            { label: "Insights", href: "/blog" },
            { label: post.title },
          ]}
        />
        <Reveal>
          <p className="eyebrow">{post.category}</p>
          <h1 className="display mt-4 max-w-4xl text-4xl md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-muted">
            {post.author} · {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min read
          </p>
        </Reveal>
        <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[2rem]">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl space-y-6">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="text-sm font-semibold text-forest">Share</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                className="underline-offset-4 hover:underline"
              >
                Email
              </a>
            </div>
          </div>

          <div className="border-t border-line pt-8">
            <p className="text-sm uppercase tracking-[0.16em] text-muted">Author</p>
            <p className="mt-2 display text-2xl">{post.author}</p>
            <p className="mt-2 text-muted">Founder, CoachME Advisory</p>
          </div>
        </div>

        {related.length ? (
          <div className="mt-16">
            <h2 className="display text-3xl">Related articles</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="rounded-2xl border border-line bg-white p-6"
                >
                  <h3 className="display text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </article>
  );
}
