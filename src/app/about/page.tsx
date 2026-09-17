import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "About Marco Poletto",
  description:
    "Marco Poletto is an engineering leader in the Netherlands leading product domains and delivery operations at Rentman.",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: "About Marco Poletto",
    description:
      "Marco Poletto is an engineering leader in the Netherlands leading product domains and delivery operations at Rentman.",
    url: "/about/",
  },
  twitter: {
    title: "About Marco Poletto",
    description:
      "Marco Poletto is an engineering leader in the Netherlands leading product domains and delivery operations at Rentman.",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <article className="prose mx-auto max-w-3xl">
            <p className="eyebrow">About Marco Poletto</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Engineering leadership without losing the people inside it.
            </h1>
            <p className="mt-7 text-xl leading-8 text-[var(--muted)] sm:text-2xl">
              I&apos;m Marco Poletto, an engineering leader based in the Netherlands.
              At Rentman, a B2B SaaS company, I lead engineering across three
              product domains and own delivery operations for the whole engineering
              organisation.
            </p>

            <h2>What I do now</h2>
            <p>
              My title at Rentman is Development Team Lead &amp; Delivery Operations.
              I lead three engineering teams across the Financial, Customer
              Lifecycle, and Integrations domains, and I&apos;m building the
              Integrations team from the ground up.
            </p>
            <p>
              Alongside the teams, I&apos;m accountable for delivery operations across
              engineering: release management, software quality, and incident
              response. Making delivery predictable across teams without slowing
              them down is the part of the role I find most interesting.
            </p>

            <h2>How I got here</h2>
            <p>
              I started in the codebase - a frontend engineer who believed that if
              you just wrote good code, everything else would fall into place.
              Turns out, everything else is the hard part.
            </p>
            <p>
              Over more than a decade across the UK and the Netherlands, I moved
              from building interfaces to building teams: senior frontend and Scrum
              Master roles, then engineering management at Mindsay / ViaSay and
              Vinted. Somewhere along the way I realised the most interesting
              problems weren&apos;t in the code. They were in how teams decide, align,
              and stay healthy while everything around them changes.
            </p>
            <p>
              <em>
                Before any of that, I spent nine years driving high-speed trains.
                It taught me more about staying calm and decisive under pressure
                than any framework has since.
              </em>
            </p>

            <h2>What I&apos;ve learned scaling teams</h2>
            <ul>
              <li>
                <strong>Scaling through hyper-growth.</strong> At Vinted, I
                standardised performance calibration across multidisciplinary teams
                and helped restructure an organisation without halting delivery.
              </li>
              <li>
                <strong>Doubling a team without breaking it.</strong> At Mindsay /
                ViaSay, I grew a department from 8 to 15+ engineers while keeping
                culture and stability intact.
              </li>
              <li>
                <strong>Making technology pay off.</strong> I led delivery of
                ML-infused automation that cut manual overhead by roughly 40% for
                enterprise clients.
              </li>
            </ul>

            <h2>How I lead</h2>
            <p>
              My instinct leans toward clarity and lightness: clear ownership,
              processes that earn their keep, and as little ceremony as the work
              allows. I care about building engineering organisations that stay
              fast as they grow, where autonomy is real because the guardrails are
              clear.
            </p>

            <h2>What I care about</h2>
            <ul>
              <li>Scaling engineering organisations and paying down management debt.</li>
              <li>Sustainable, predictable delivery without burnout.</li>
              <li>Psychological safety as the foundation of durable teams.</li>
              <li>The engineer-to-leader transition and the identity shifts it requires.</li>
              <li>AI and organisational change, especially how leaders guide people through it.</li>
            </ul>

            <h2>Let&apos;s connect</h2>
            <p>
              Read the articles, disagree with them, share them with your team -
              this space is better as a conversation than a monologue. You can
              reach me at{" "}
              <a href="mailto:marco@poletto.dev">marco@poletto.dev</a> or find
              me on{" "}
              <a href="https://www.linkedin.com/in/marco-poletto-96853774/">
                LinkedIn
              </a>
              , <a href="https://github.com/polettoweb">GitHub</a>, or{" "}
              <a href="https://bsky.app/profile/poletto.dev">Bluesky</a>.
            </p>
          </article>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}
