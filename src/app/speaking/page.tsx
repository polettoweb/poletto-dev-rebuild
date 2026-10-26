import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const description =
  "Talks by Marco Poletto on incident response, building and splitting engineering teams, and leading AI-augmented work. Abstracts, bio, and how to invite him.";

export const metadata: Metadata = {
  title: "Speaking | Marco Poletto",
  description,
  alternates: {
    canonical: "/speaking/",
  },
  openGraph: {
    title: "Speaking | Marco Poletto",
    description,
    url: "/speaking/",
  },
  twitter: {
    title: "Speaking | Marco Poletto",
    description,
  },
};

type Talk = {
  id: string;
  title: string;
  length: string;
  audience: string;
  abstract: string[];
  takeaways: string[];
  basedOn: { href: string; label: string };
};

const talks: Talk[] = [
  {
    id: "trains-incident-response",
    title: "The Job Starts When Something Breaks: Incident Response Lessons from the High-Speed Railway",
    length: "30–40 min talk",
    audience: "Engineering managers, SREs, on-call engineers, anyone who owns an incident process",
    abstract: [
      "Everybody can drive a train when everything goes smoothly. Before I worked in software, I spent nine years driving high-speed trains in Italy. I've been stopped in a 20 km tunnel, in open countryside and in the middle of Milano Centrale, with a fault somewhere ahead and a phone that wouldn't stop ringing.",
      "Today I own incident response for an engineering organisation, and I keep recognising the railway in our runbooks. I also keep noticing what software lost in translation. This talk is about what the railway gets right: procedures written by calm people for people who won't be calm, ownership settled before anything goes wrong, warning the trains behind you, and keeping the person fixing the problem off the phone. It's also about one place the comparison stops working, and what 'blameless' should and shouldn't mean.",
    ],
    takeaways: [
      "Why the first five minutes of an incident should need no judgment at all, and how to write runbooks that hold up at 3am",
      "How to separate the person working the problem from the person handling communication",
      "Why 'blameless' must not quietly become 'procedureless'",
    ],
    basedOn: {
      href: "/blog/what-driving-high-speed-trains-taught-me-about-incident-response/",
      label: "What Nine Years Driving High-Speed Trains Taught Me About Incident Response",
    },
  },
  {
    id: "incubate-then-split",
    title: "Incubate, Then Split: Growing a New Team Inside an Old One",
    length: "25–30 min talk",
    audience: "Engineering managers, directors, product leaders planning a team split",
    abstract: [
      "When a team runs out of room, the instinct is to make it bigger. But a bigger team adds coordination as well as capacity, and the bottleneck usually just moves. The team often hasn't run out of people. It has run out of ownership.",
      "These are field notes from standing up a new integrations team. We hired its engineers into the existing team first and let them absorb the codebase and the culture. Then we split them out with a clear boundary: business logic stays home, the edge moves. I'll cover what worked, how to draw a boundary with a rule instead of a list, and the mistake I'd avoid next time: having the engineers ready before product was.",
    ],
    takeaways: [
      "How to tell a capacity problem apart from an ownership problem",
      "A practical incubate-then-split playbook for creating a new team",
      "Why you should staff the question (product) before you staff the answer (engineering)",
    ],
    basedOn: {
      href: "/blog/building-a-team-from-zero-incubate-then-split/",
      label: "Building a Team From Zero: Incubate, Then Split",
    },
  },
  {
    id: "leading-the-agent",
    title: "The Agent Wrote the Code. Leading It Was the Job.",
    length: "25–30 min talk, or a 10 min lightning version",
    audience: "Engineers and leaders adopting AI coding agents",
    abstract: [
      "I rebuilt this website with an AI coding agent, which wrote most of the code. The speed isn't the interesting part, because anyone can get code back fast. The interesting part is the moments I overrode it.",
      "I refused to let it invent content that looked finished. I made an inconsistency impossible to write, not just detectable. I asked for receipts instead of confident claims, and turned down an architecture that worked but wasn't the right shape. Each of those moments maps onto something engineering leaders already do: reviewing work you didn't produce, and holding a line the first time so it doesn't need repeating. This talk turns 'AI-augmented development' from a buzzword into concrete habits a team can adopt on Monday.",
    ],
    takeaways: [
      "The difference between reviewing an agent's output and directing it",
      "Verification habits that catch the gap between 'looks finished' and 'is finished'",
      "Why the skill that matters most hasn't changed, even though the tools have",
    ],
    basedOn: {
      href: "/blog/the-agent-wrote-the-code-leading-it-was-the-job/",
      label: "The Agent Wrote the Code. Leading It Was the Job.",
    },
  },
];

const otherTopics = [
  "Why AI is quietly breaking the junior-to-senior engineer pipeline, and what leaders can do about it",
  "What actually connects remote and hybrid teams (it isn't more meetings)",
  "Doubling a team and restructuring one without halting delivery",
  "Career change: from train driver to developer to engineering manager",
];

export default function SpeakingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageContainer className="py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">Speaking</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              Field notes, told on stage.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-(--muted) sm:text-2xl">
              I give talks on incident response, building and splitting
              engineering teams, and leading AI-augmented work. Every talk comes
              from something I&apos;ve actually done, not something I&apos;ve
              read about.
            </p>
            <p className="mt-6 text-(--muted)">
              Conferences, meetups, podcasts, panels and internal talks for
              engineering organisations. In person across the Netherlands and
              Benelux, and remote anywhere.
            </p>
            <a href="#invite" className="link-arrow mt-8 inline-block font-semibold">
              Invite me to speak →
            </a>
          </div>

          <section className="mt-20" aria-labelledby="talks-heading">
            <h2 id="talks-heading" className="text-3xl font-semibold tracking-tight">
              Talks
            </h2>
            <ol className="mt-8 space-y-14">
              {talks.map((talk) => (
                <li key={talk.id} className="max-w-3xl border-t border-(--line) pt-8">
                  <article aria-labelledby={`${talk.id}-title`}>
                    <p className="eyebrow">{talk.length}</p>
                    <h3
                      id={`${talk.id}-title`}
                      className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
                    >
                      {talk.title}
                    </h3>
                    <p className="mt-3 text-sm text-(--muted)">
                      <span className="font-semibold">For:</span> {talk.audience}
                    </p>
                    <div className="prose mt-6">
                      {talk.abstract.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                      <h4 className="font-semibold">Attendees will leave with</h4>
                      <ul>
                        {talk.takeaways.map((takeaway) => (
                          <li key={takeaway}>{takeaway}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="mt-6 text-sm">
                      Based on the essay{" "}
                      <Link href={talk.basedOn.href} className="link-arrow">
                        {talk.basedOn.label}
                      </Link>
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="mt-20 max-w-3xl border-t border-(--line) pt-8"
            aria-labelledby="other-topics-heading"
          >
            <h2 id="other-topics-heading" className="text-3xl font-semibold tracking-tight">
              Also happy to talk about
            </h2>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-8">
              {otherTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <p className="mt-6 text-(--muted)">
              Most of these already exist as{" "}
              <Link href="/topics" className="link-arrow">
                essays
              </Link>
              , and any of them can be shaped into a talk, panel contribution or
              podcast conversation for your audience.
            </p>
          </section>

          <section
            className="mt-20 max-w-3xl border-t border-(--line) pt-8"
            aria-labelledby="bio-heading"
          >
            <h2 id="bio-heading" className="text-3xl font-semibold tracking-tight">
              Speaker bio
            </h2>
            <p className="mt-4 text-(--muted)">Free to copy into your programme.</p>

            <h3 className="mt-8 text-lg font-semibold">Short</h3>
            <p className="mt-3 rounded-sm bg-(--tint) p-5 leading-7">
              Marco Poletto is an engineering leader based in the Netherlands
              who writes about org design, delivery and the human side of
              technology at poletto.dev. Before software, he spent nine years
              driving high-speed trains.
            </p>

            <h3 className="mt-8 text-lg font-semibold">Long</h3>
            <div className="mt-3 space-y-4 rounded-sm bg-(--tint) p-5 leading-7">
              <p>
                Marco Poletto is an engineering leader based in the
                Netherlands. At Rentman, a B2B SaaS company, he leads three
                engineering teams, one of them built from scratch, and owns
                delivery operations, quality and incident response across
                engineering. Before that, he led engineering teams at Vinted
                and Mindsay, through hyper-growth, team doubling and
                restructuring.
              </p>
              <p>
                His path into leadership was anything but standard. He spent
                nine years driving high-speed trains in Italy, retrained as a
                frontend developer in the UK, and moved from building
                interfaces to building teams. He writes about scaling
                engineering organisations, sustainable delivery and leading
                through AI-driven change at poletto.dev.
              </p>
            </div>
          </section>

          <section
            id="invite"
            className="mt-20 max-w-3xl scroll-mt-8 border-t border-(--line) pt-8"
            aria-labelledby="invite-heading"
          >
            <h2 id="invite-heading" className="text-3xl font-semibold tracking-tight">
              Invite me to speak
            </h2>
            <p className="mt-4 text-(--muted)">
              Tell me about your event, your audience, the date and the format,
              and which talk or topic you have in mind. I read everything and
              reply as soon as I can.
            </p>
            <a
              href="mailto:marco@poletto.dev?subject=Speaking%20invitation"
              className="mt-8 inline-block text-2xl font-semibold underline underline-offset-4 sm:text-3xl"
            >
              marco@poletto.dev
            </a>
          </section>
        </PageContainer>
      </main>
      <SiteFooter />
    </>
  );
}
