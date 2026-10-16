const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Article dates are stored as ISO "YYYY-MM-DD"; render them as "16 Oct 2026".
// Built by hand rather than with Intl so every month gets a three-letter
// abbreviation (en-GB renders September as "Sept").
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}
