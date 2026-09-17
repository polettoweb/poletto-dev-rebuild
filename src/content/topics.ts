import { articles, type Article } from "./articles";

export type Topic = {
  slug: string;
  title: string;
  description: string;
  articleSlugs: string[];
};

export const topics: Topic[] = [
  {
    slug: "scaling-organisations",
    title: "Scaling Engineering Organisations",
    description:
      "The organisational choices that help engineering teams stay fast as their scope grows.",
    articleSlugs: [
      "engineering-strategy-is-mostly-saying-no",
      "what-changes-when-you-start-managing-managers",
      "scaling-without-breaking-field-notes-on-growth-and-reorgs",
      "engineering-strategy-executives-actually-read",
      "refactoring-the-organization-how-to-pay-down-management-debt",
    ],
  },
  {
    slug: "delivery-and-engineering-excellence",
    title: "Delivery & Engineering Excellence",
    description:
      "Making delivery predictable without losing judgment, focus, or morale.",
    articleSlugs: [
      "engineering-strategy-is-mostly-saying-no",
      "delivery-operations-as-a-system",
      "measuring-velocity-without-killing-morale",
      "when-a-deployment-breaks-leading-a-blameless-post-mortem",
    ],
  },
  {
    slug: "people-and-team-culture",
    title: "People & Team Culture",
    description:
      "The human signals behind healthy teams and sustainable leadership.",
    articleSlugs: [
      "ai-is-breaking-the-junior-engineer-pipeline",
      "signs-you-promoted-the-wrong-person-into-management",
      "how-i-grow-an-engineer-into-a-manager",
      "what-i-look-for-when-hiring-and-growing-engineering-managers",
      "leading-in-the-fog",
      "proximity-isnt-bonding-what-actually-connects-a-remote-team",
      "designing-an-effective-onboarding-plan-for-new-engineers",
      "engineering-leadership-beyond-delivery-why-psychological-safety-matters",
      "measuring-velocity-without-killing-morale",
      "when-a-deployment-breaks-leading-a-blameless-post-mortem",
    ],
  },
  {
    slug: "ai-and-the-future-of-engineering-work",
    title: "AI & the Future of Engineering Work",
    description:
      "Leading people through AI-driven change while protecting engineering craft.",
    articleSlugs: [
      "ai-is-breaking-the-junior-engineer-pipeline",
      "the-agent-wrote-the-code-leading-it-was-the-job",
      "managing-through-ai-fatigue-keeping-dev-teams-grounded-in-the-age-of-automation",
    ],
  },
  {
    slug: "career-and-growth",
    title: "Career & Growth",
    description:
      "Navigating your own path - not just the team's - through the IC/management fork and beyond.",
    articleSlugs: [
      "engineering-management-in-the-netherlands-should-you-stay-technical-or-embrace-leadership",
      "how-i-grow-an-engineer-into-a-manager",
      "what-i-look-for-when-hiring-and-growing-engineering-managers",
      "the-engineering-leaders-reading-list",
      "accessible-engineering-manager-book-a-remarkable-read",
      "technically-updating-yourself-while-being-an-engineering-manager",
      "from-engineer-to-engineering-manager",
    ],
  },
];

export function getArticlesForTopic(topic: Topic): Article[] {
  return articles.filter((article) => topic.articleSlugs.includes(article.slug));
}
