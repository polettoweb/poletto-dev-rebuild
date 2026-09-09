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
    ],
  },
  {
    slug: "delivery-and-engineering-excellence",
    title: "Delivery & Engineering Excellence",
    description:
      "Making delivery predictable without losing judgment, focus, or morale.",
    articleSlugs: ["engineering-strategy-is-mostly-saying-no"],
  },
  {
    slug: "people-and-team-culture",
    title: "People & Team Culture",
    description:
      "The human signals behind healthy teams and sustainable leadership.",
    articleSlugs: [
      "ai-is-breaking-the-junior-engineer-pipeline",
      "signs-you-promoted-the-wrong-person-into-management",
    ],
  },
  {
    slug: "ai-and-the-future-of-engineering-work",
    title: "AI & the Future of Engineering Work",
    description:
      "Leading people through AI-driven change while protecting engineering craft.",
    articleSlugs: ["ai-is-breaking-the-junior-engineer-pipeline"],
  },
];

export function getArticlesForTopic(topic: Topic): Article[] {
  return articles.filter((article) => topic.articleSlugs.includes(article.slug));
}
