import Link from "next/link";

import { PageContainer } from "./PageContainer";
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
        <Link href="/" className="font-semibold tracking-tight">
          Marco Poletto
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-5 text-sm">
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
