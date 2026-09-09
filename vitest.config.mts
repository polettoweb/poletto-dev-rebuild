import mdx from "@mdx-js/rollup";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Article metadata imports MDX bodies directly so `hasContent` can be
  // derived from the same registry that renders them (see src/content/articles.ts).
  // Vitest needs its own MDX transform for that import to resolve in tests.
  plugins: [{ enforce: "pre", ...mdx() }],
  test: {
    include: ["src/**/*.test.ts"],
  },
});