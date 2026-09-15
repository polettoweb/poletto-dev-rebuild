import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Get in Touch | Marco Poletto",
  description:
    "Contact Marco Poletto about engineering leadership, organisational scaling, speaking, or collaboration.",
  alternates: {
    canonical: "/contact/",
  },
};

const socialLinks = [
  { href: "https://x.com/GamerSince8bit", label: "X / Twitter" },
  { href: "https://github.com/polettoweb", label: "GitHub" },
  { href: "https://bsky.app/profile/poletto.dev", label: "Bluesky" },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <article className="max-w-3xl">
            <p className="eyebrow">Get in touch</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Let&apos;s compare notes.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--muted)] sm:text-2xl">
              Whether you&apos;re hiring for a Director or Head of Engineering role,
              want to discuss scaling an engineering organisation, would like to
              invite me to speak, or just want to say hello, I&apos;d love to hear
              from you.
            </p>

            <section className="mt-14 border-t border-[var(--line)] pt-8" aria-labelledby="contact-methods-heading">
              <h2 id="contact-methods-heading" className="text-3xl font-semibold tracking-tight">
                The most reliable way to reach me
              </h2>
              <p className="mt-4 max-w-xl text-[var(--muted)]">
                I read everything and reply as soon as I can.
              </p>
              <a
                href="mailto:marco@poletto.dev"
                className="mt-8 inline-block text-2xl font-semibold underline underline-offset-4 sm:text-3xl"
              >
                marco@poletto.dev
              </a>
            </section>

            <section className="mt-14 border-t border-[var(--line)] pt-8" aria-labelledby="linkedin-heading">
              <p className="eyebrow">LinkedIn</p>
              <h2 id="linkedin-heading" className="mt-3 text-3xl font-semibold tracking-tight">
                Connect and message me
              </h2>
              <a
                href="https://www.linkedin.com/in/marco-poletto-96853774/"
                target="_blank"
                rel="noreferrer"
                className="link-arrow mt-4 inline-block"
              >
                Open LinkedIn →
              </a>
            </section>

            <section className="mt-14 border-t border-[var(--line)] pt-8" aria-labelledby="elsewhere-heading">
              <h2 id="elsewhere-heading" className="text-3xl font-semibold tracking-tight">
                You can also find me on
              </h2>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-arrow"
                    >
                      {link.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}
