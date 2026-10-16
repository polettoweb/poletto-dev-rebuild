import Link from "next/link";

type TopicTagProps = {
  href?: string;
  children: string;
};

const pillClassName =
  "inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--tint)] px-3 py-1 text-xs font-medium leading-none";

export function TopicTag({ href, children }: TopicTagProps) {
  if (!href) {
    return <span className={pillClassName}>{children}</span>;
  }

  return (
    <Link
      href={href}
      className={`${pillClassName} transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]`}
    >
      {children}
    </Link>
  );
}
