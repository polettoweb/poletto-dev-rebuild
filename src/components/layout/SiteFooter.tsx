import Link from "next/link";

import { PageContainer } from "./PageContainer";

const navigation = [
  { href: "/start-here", label: "Start here" },
  { href: "/blog", label: "Blog" },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contact", label: "Contact" },
  { href: "/rss.xml", label: "RSS" },
];

export function SiteFooter() {
  return (
    <footer>
      <PageContainer className="flex flex-col gap-6 py-10 text-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="font-semibold tracking-tight">
            Marco Poletto
          </Link>
          <p className="mt-2 max-w-sm text-pretty">
            Engineering leadership for scaling teams and organisations.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>© {new Date().getFullYear()} Marco Poletto</p>
        </div>
      </PageContainer>
    </footer>
  );
}
