import Link from "next/link";
import { footerNav, siteSettings } from "@coachme/content";

export function Footer() {
  return (
    <footer className="surface-forest grain">
      <div className="container-page relative z-10 section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="display text-3xl text-ivory">{siteSettings.name}</p>
            <p className="mt-4 max-w-sm text-ivory/75 leading-relaxed">{siteSettings.tagline}</p>
            <div className="mt-6 space-y-2 text-sm text-ivory/70">
              <p>{siteSettings.legalName}</p>
              <p>{siteSettings.location}</p>
              <a href={`mailto:${siteSettings.email}`} className="hover:text-champagne">
                {siteSettings.email}
              </a>
            </div>
          </div>

          <FooterColumn title="Explore" links={footerNav.explore} />
          <FooterColumn title="Services" links={footerNav.services} />
          <div>
            <FooterColumn title="Legal" links={footerNav.legal} />
            <div className="mt-8 flex flex-col gap-2 text-sm text-ivory/70">
              {siteSettings.social.linkedin ? (
                <a href={siteSettings.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-champagne">
                  LinkedIn
                </a>
              ) : null}
              {siteSettings.social.instagram ? (
                <a href={siteSettings.social.instagram} target="_blank" rel="noreferrer" className="hover:text-champagne">
                  Instagram
                </a>
              ) : null}
              {siteSettings.social.youtube ? (
                <a href={siteSettings.social.youtube} target="_blank" rel="noreferrer" className="hover:text-champagne">
                  YouTube
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>{siteSettings.copyright}</p>
          <p>Local redesign demo — live Wix site remains client-facing until cutover.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ivory/75 transition hover:text-ivory">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
