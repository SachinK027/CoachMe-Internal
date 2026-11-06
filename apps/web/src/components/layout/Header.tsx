"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, siteSettings } from "@coachme/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ivory/90 backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="display text-2xl text-forest">
          {siteSettings.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navigation.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "text-sm font-medium tracking-wide transition",
                    isActive(item.href) ? "text-forest" : "text-charcoal/80 hover:text-forest",
                  )}
                  aria-expanded={aboutOpen}
                >
                  {item.label}
                </button>
                <div
                  className={cn(
                    "absolute left-0 top-full min-w-[14rem] pt-3 transition",
                    aboutOpen ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_rgba(37,43,41,0.12)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-sm transition hover:bg-ivory",
                          isActive(child.href) ? "text-forest font-semibold" : "text-charcoal",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition",
                  isActive(item.href) ? "text-forest" : "text-charcoal/80 hover:text-forest",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/booking/strategic-introduction-call">Book Introduction Call</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-5 bg-charcoal transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-5 bg-charcoal transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-5 bg-charcoal transition", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-ivory lg:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {navigation.map((item) => (
              <div key={item.href} className="flex flex-col gap-1">
                <Link
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="rounded-xl px-5 py-2 text-sm text-muted"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Button href="/booking/strategic-introduction-call" className="mt-2 w-full">
              Book Introduction Call
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
