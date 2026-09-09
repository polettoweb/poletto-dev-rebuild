export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  hasContent?: boolean;
  featured?: boolean;
};

export const articles: Article[] = [
  {
    slug: "engineering-strategy-is-mostly-saying-no",
    title: "Engineering Strategy Is Mostly Saying No",
    excerpt:
      "A strategy that says yes to everything is just a to-do list with ambitions. The core skill of a senior engineering leader isn't picking what to build - it's deciding, out loud, what you won't.",
    date: "2026-08-25",
    readTime: "6 min read",
    tags: ["leadership", "strategy", "management"],
    hasContent: true,
    featured: true,
  },
  {
    slug: "what-changes-when-you-start-managing-managers",
    title: "What Changes When You Start Managing Managers",
    excerpt:
      "The skills that made you a great engineering manager quietly become liabilities the day you start leading other managers.",
    date: "2026-08-22",
    readTime: "7 min read",
    tags: ["leadership", "management"],
  },
  {
    slug: "ai-is-breaking-the-junior-engineer-pipeline",
    title: "AI Is Quietly Breaking the Junior-Engineer Pipeline",
    excerpt:
      "Teams are hiring fewer juniors because AI does the grunt work now. But that grunt work was the apprenticeship.",
    date: "2026-08-18",
    readTime: "5 min read",
    tags: ["ai", "leadership", "career"],
  },
  {
    slug: "signs-you-promoted-the-wrong-person-into-management",
    title: "The Signs You Promoted the Wrong Person Into Management",
    excerpt:
      "A struggling manager rarely announces it - the team does, quietly, months before it hits a dashboard.",
    date: "2026-07-29",
    readTime: "5 min read",
    tags: ["management", "leadership", "team-culture"],
  },
];

export const featuredArticle = articles.find((article) => article.featured) ?? articles[0];

export const latestArticles = articles.filter(
  (article) => article.slug !== featuredArticle.slug,
);

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticles() {
  return articles.filter((article) => article.hasContent);
}