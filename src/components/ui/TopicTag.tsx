import Link from "next/link";

type TopicTagProps = {
  href: string;
  children: string;
};

export function TopicTag({ href, children }: TopicTagProps) {
  return (
    <Link href={href} className="text-sm underline underline-offset-4">
      #{children}
    </Link>
  );
}
