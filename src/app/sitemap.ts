import type { MetadataRoute } from "next";

import { articles } from "@/content/articles";

const siteUrl = "https://poletto.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/blog", "/contact", "/newsletter", "/start-here", "/topics"];
  const articlePages = articles
    .filter((article) => article.hasContent)
    .map((article) => `/blog/${article.slug}`);

  return [...pages, ...articlePages].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-09-09"),
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
  }));
}
