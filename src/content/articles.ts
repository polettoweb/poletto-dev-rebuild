import type { ComponentType } from "react";

import AccessibleEngineeringManagerBookARemarkableRead from "./articles/accessible-engineering-manager-book-a-remarkable-read.mdx";
import AiIsBreakingTheJuniorEngineerPipeline from "./articles/ai-is-breaking-the-junior-engineer-pipeline.mdx";
import DeliveryOperationsAsASystem from "./articles/delivery-operations-as-a-system.mdx";
import DesigningAnEffectiveOnboardingPlanForNewEngineers from "./articles/designing-an-effective-onboarding-plan-for-new-engineers.mdx";
import EngineeringLeadershipBeyondDeliveryWhyPsychologicalSafetyMatters from "./articles/engineering-leadership-beyond-delivery-why-psychological-safety-matters.mdx";
import EngineeringManagementInTheNetherlandsShouldYouStayTechnicalOrEmbraceLeadership from "./articles/engineering-management-in-the-netherlands-should-you-stay-technical-or-embrace-leadership.mdx";
import EngineeringStrategyExecutivesActuallyRead from "./articles/engineering-strategy-executives-actually-read.mdx";
import EngineeringStrategyIsMostlySayingNo from "./articles/engineering-strategy-is-mostly-saying-no.mdx";
import FromEngineerToEngineeringManager from "./articles/from-engineer-to-engineering-manager.mdx";
import HowIGrowAnEngineerIntoAManager from "./articles/how-i-grow-an-engineer-into-a-manager.mdx";
import LeadingInTheFog from "./articles/leading-in-the-fog.mdx";
import ManagingThroughAiFatigueKeepingDevTeamsGroundedInTheAgeOfAutomation from "./articles/managing-through-ai-fatigue-keeping-dev-teams-grounded-in-the-age-of-automation.mdx";
import MeasuringVelocityWithoutKillingMorale from "./articles/measuring-velocity-without-killing-morale.mdx";
import RefactoringTheOrganizationHowToPayDownManagementDebt from "./articles/refactoring-the-organization-how-to-pay-down-management-debt.mdx";
import ScalingWithoutBreakingFieldNotesOnGrowthAndReorgs from "./articles/scaling-without-breaking-field-notes-on-growth-and-reorgs.mdx";
import SignsYouPromotedTheWrongPersonIntoManagement from "./articles/signs-you-promoted-the-wrong-person-into-management.mdx";
import TechnicallyUpdatingYourselfWhileBeingAnEngineeringManager from "./articles/technically-updating-yourself-while-being-an-engineering-manager.mdx";
import TheAgentWroteTheCodeLeadingItWasTheJob from "./articles/the-agent-wrote-the-code-leading-it-was-the-job.mdx";
import TheEngineeringLeadersReadingList from "./articles/the-engineering-leaders-reading-list.mdx";
import WhatChangesWhenYouStartManagingManagers from "./articles/what-changes-when-you-start-managing-managers.mdx";
import WhatILookForWhenHiringAndGrowingEngineeringManagers from "./articles/what-i-look-for-when-hiring-and-growing-engineering-managers.mdx";
import WhenADeploymentBreaksLeadingABlamelessPostMortem from "./articles/when-a-deployment-breaks-leading-a-blameless-post-mortem.mdx";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  hasContent: boolean;
  featured?: boolean;
};

// Single source of truth for which article bodies are verified and
// renderable. `Article.hasContent` is derived from this map rather than
// hand-set per entry, so metadata can never claim a body that doesn't exist
// (or hide one that does).
export const contentBySlug: Record<string, ComponentType> = {
  "accessible-engineering-manager-book-a-remarkable-read": AccessibleEngineeringManagerBookARemarkableRead,
  "ai-is-breaking-the-junior-engineer-pipeline": AiIsBreakingTheJuniorEngineerPipeline,
  "delivery-operations-as-a-system": DeliveryOperationsAsASystem,
  "designing-an-effective-onboarding-plan-for-new-engineers": DesigningAnEffectiveOnboardingPlanForNewEngineers,
  "engineering-leadership-beyond-delivery-why-psychological-safety-matters": EngineeringLeadershipBeyondDeliveryWhyPsychologicalSafetyMatters,
  "engineering-management-in-the-netherlands-should-you-stay-technical-or-embrace-leadership": EngineeringManagementInTheNetherlandsShouldYouStayTechnicalOrEmbraceLeadership,
  "engineering-strategy-executives-actually-read": EngineeringStrategyExecutivesActuallyRead,
  "engineering-strategy-is-mostly-saying-no": EngineeringStrategyIsMostlySayingNo,
  "from-engineer-to-engineering-manager": FromEngineerToEngineeringManager,
  "how-i-grow-an-engineer-into-a-manager": HowIGrowAnEngineerIntoAManager,
  "leading-in-the-fog": LeadingInTheFog,
  "managing-through-ai-fatigue-keeping-dev-teams-grounded-in-the-age-of-automation": ManagingThroughAiFatigueKeepingDevTeamsGroundedInTheAgeOfAutomation,
  "measuring-velocity-without-killing-morale": MeasuringVelocityWithoutKillingMorale,
  "refactoring-the-organization-how-to-pay-down-management-debt": RefactoringTheOrganizationHowToPayDownManagementDebt,
  "scaling-without-breaking-field-notes-on-growth-and-reorgs": ScalingWithoutBreakingFieldNotesOnGrowthAndReorgs,
  "signs-you-promoted-the-wrong-person-into-management": SignsYouPromotedTheWrongPersonIntoManagement,
  "technically-updating-yourself-while-being-an-engineering-manager": TechnicallyUpdatingYourselfWhileBeingAnEngineeringManager,
  "the-agent-wrote-the-code-leading-it-was-the-job": TheAgentWroteTheCodeLeadingItWasTheJob,
  "the-engineering-leaders-reading-list": TheEngineeringLeadersReadingList,
  "what-changes-when-you-start-managing-managers": WhatChangesWhenYouStartManagingManagers,
  "what-i-look-for-when-hiring-and-growing-engineering-managers": WhatILookForWhenHiringAndGrowingEngineeringManagers,
  "when-a-deployment-breaks-leading-a-blameless-post-mortem": WhenADeploymentBreaksLeadingABlamelessPostMortem,
};

type ArticleData = Omit<Article, "hasContent">;

const articleData: ArticleData[] = [
  {
    slug: "the-agent-wrote-the-code-leading-it-was-the-job",
    title: "The Agent Wrote the Code. Leading It Was the Job.",
    excerpt:
      "This site was built with an AI coding agent. The interesting part isn't how fast it went - it's the moments I overrode it, and what those moments actually have to do with engineering leadership.",
    date: "2026-09-09",
    readTime: "8 min read",
    tags: ["ai", "leadership"],
    featured: true,
  },
  {
    slug: "engineering-strategy-is-mostly-saying-no",
    title: "Engineering Strategy Is Mostly Saying No",
    excerpt:
      "A strategy that says yes to everything is just a to-do list with ambitions. The core skill of a senior engineering leader isn't picking what to build - it's deciding, out loud, what you won't.",
    date: "2026-08-25",
    readTime: "6 min read",
    tags: ["leadership", "strategy", "management"],
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
  {
    slug: "how-i-grow-an-engineer-into-a-manager",
    title: "How I Grow an Engineer Into a Manager",
    excerpt:
      "Promoting your best engineer into management as a reward is how you lose a great engineer and gain a struggling manager in one move.",
    date: "2026-07-27",
    readTime: "7 min read",
    tags: ["leadership", "management", "career"],
  },
  {
    slug: "what-i-look-for-when-hiring-and-growing-engineering-managers",
    title: "What I Look For When Hiring (and Growing) Engineering Managers",
    excerpt:
      "Hiring engineering managers is the highest-leverage decision a leader makes - and the easiest to get wrong.",
    date: "2026-07-20",
    readTime: "6 min read",
    tags: ["leadership", "hiring", "management"],
  },
  {
    slug: "scaling-without-breaking-field-notes-on-growth-and-reorgs",
    title: "Scaling Without Breaking: Field Notes on Doubling a Team and Restructuring an Org",
    excerpt:
      "Two of the hardest things an engineering leader does are grow a team fast and restructure one that already exists - without breaking either.",
    date: "2026-07-19",
    readTime: "6 min read",
    tags: ["leadership", "scaling", "management"],
  },
  {
    slug: "the-engineering-leaders-reading-list",
    title: "The Engineering Leader's Reading List",
    excerpt:
      "The books I'd actually hand to someone stepping into engineering leadership - grouped by the problem they solve, not by fame.",
    date: "2026-07-18",
    readTime: "4 min read",
    tags: ["leadership", "books", "career"],
  },
  {
    slug: "delivery-operations-as-a-system",
    title: "Delivery Operations as a System: Making Delivery Predictable Without Slowing Teams Down",
    excerpt:
      "Most orgs try to make delivery predictable by adding process on top of teams. That's backwards.",
    date: "2026-07-17",
    readTime: "5 min read",
    tags: ["leadership", "delivery", "management"],
  },
  {
    slug: "engineering-strategy-executives-actually-read",
    title: "Engineering Strategy That Executives Actually Read",
    excerpt:
      "Most engineering strategy documents die in a shared drive because they're written in engineering, not in the language that gets things funded.",
    date: "2026-07-16",
    readTime: "6 min read",
    tags: ["leadership", "strategy", "management"],
  },
  {
    slug: "refactoring-the-organization-how-to-pay-down-management-debt",
    title: "Refactoring the Organization: How to Pay Down Management Debt",
    excerpt:
      "Management debt - poorly structured organisations and bloated process - cripples engineering velocity the same way technical debt cripples a codebase.",
    date: "2026-07-14",
    readTime: "9 min read",
    tags: ["leadership", "management"],
  },
  {
    slug: "managing-through-ai-fatigue-keeping-dev-teams-grounded-in-the-age-of-automation",
    title: "Managing Through AI Fatigue: Keeping Dev Teams Grounded in the Age of Automation",
    excerpt:
      "AI assistants promised to make developers 10x more productive. Instead, many teams are dealing with cognitive overload and burnout.",
    date: "2026-07-08",
    readTime: "8 min read",
    tags: ["leadership", "culture", "productivity"],
  },
  {
    slug: "leading-in-the-fog",
    title: "Leading in the Fog: How to Guide Engineering Teams Through Organizational Uncertainty",
    excerpt:
      "A guide for engineering managers navigating reorgs, strategic pivots, and layoffs while protecting team focus and morale.",
    date: "2026-07-03",
    readTime: "6 min read",
    tags: ["leadership", "culture", "crisis-management"],
  },
  {
    slug: "measuring-velocity-without-killing-morale",
    title: "Measuring Velocity Without Killing Morale: A Practical Guide to Team Metrics",
    excerpt:
      "How to use engineering metrics without crushing developer agency, burning out your team, or falling into the Goodhart's Law trap.",
    date: "2026-07-01",
    readTime: "8 min read",
    tags: ["management", "productivity", "culture"],
  },
  {
    slug: "designing-an-effective-onboarding-plan-for-new-engineers",
    title: "Designing an Effective Onboarding Plan for New Engineers",
    excerpt:
      "A structured, phased onboarding guide to set up new software engineering hires for long-term success, autonomy, and early wins.",
    date: "2026-06-29",
    readTime: "5 min read",
    tags: ["management", "onboarding", "team-culture"],
  },
  {
    slug: "when-a-deployment-breaks-leading-a-blameless-post-mortem",
    title: "When a Deployment Breaks: Leading a Blameless Post-Mortem That People Actually Enjoy",
    excerpt:
      "How you handle the first few hours of a production outage determines team trust for months.",
    date: "2026-06-23",
    readTime: "6 min read",
    tags: ["management", "culture"],
  },
  {
    slug: "engineering-leadership-beyond-delivery-why-psychological-safety-matters",
    title: "Engineering Leadership Beyond Delivery: Why Psychological Safety Matters",
    excerpt:
      "When output becomes the only lens for measuring engineering success, something critical erodes beneath the surface - and it rarely shows up until it's already a crisis.",
    date: "2026-02-12",
    readTime: "3 min read",
    tags: ["leadership", "culture"],
  },
  {
    slug: "engineering-management-in-the-netherlands-should-you-stay-technical-or-embrace-leadership",
    title: "Engineering Management in the Netherlands: Should You Stay Technical or Embrace Leadership?",
    excerpt:
      "In the Dutch tech market, hybrid tech-lead-manager roles don't survive contact with scale - you're expected to choose a lane and own it.",
    date: "2026-02-05",
    readTime: "5 min read",
    tags: ["career", "leadership"],
  },
  {
    slug: "accessible-engineering-manager-book-a-remarkable-read",
    title: "Accessible Engineering Manager Book: A Remarkable Read",
    excerpt:
      "Ten lessons from the one engineering-management book I'd actually hand a first-time manager who doesn't want jargon, just what to do on Monday.",
    date: "2023-06-07",
    readTime: "4 min read",
    tags: ["leadership", "books"],
  },
  {
    slug: "technically-updating-yourself-while-being-an-engineering-manager",
    title: "Technically Updating Yourself While Being an Engineering Manager",
    excerpt:
      "You don't stay technically sharp as a manager by finding more solo coding time you don't have - you stay sharp by using the job itself differently.",
    date: "2023-04-07",
    readTime: "4 min read",
    tags: ["management", "learning"],
  },
  {
    slug: "from-engineer-to-engineering-manager",
    title: "From Engineer to Engineering Manager",
    excerpt:
      "The technical skills that made you a great engineer don't automatically transfer to management - here's what actually does, and what to build from scratch.",
    date: "2022-12-10",
    readTime: "6 min read",
    tags: ["career", "management"],
  },
];

export const articles: Article[] = articleData.map((article) => ({
  ...article,
  hasContent: Object.hasOwn(contentBySlug, article.slug),
}));

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
