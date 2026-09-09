type NewsletterSignupProps = {
  action: string;
  heading?: string;
  description?: string;
};

export function NewsletterSignup({
  action,
  heading = "Never miss an essay on engineering leadership",
  description = "Practical insights on scaling teams, delivery, and culture, delivered to your inbox.",
}: NewsletterSignupProps) {
  return (
    <section aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      <p className="mt-3 max-w-xl text-pretty">{description}</p>
      <form action={action} method="post" className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          className="min-h-11 flex-1 border border-current bg-transparent px-3"
        />
        <button type="submit" className="min-h-11 border border-current px-5 font-medium">
          Subscribe
        </button>
      </form>
    </section>
  );
}
