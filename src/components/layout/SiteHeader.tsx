import Link from "next/link";

import { PageContainer } from "./PageContainer";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navigation = [
  { href: "/start-here", label: "Start here" },
  { href: "/blog", label: "Blog" },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header>
      <PageContainer className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Logo />
          <span className="sr-only sm:not-sr-only">Marco Poletto</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-4 whitespace-nowrap text-sm sm:gap-5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </PageContainer>
    </header>
  );
}
