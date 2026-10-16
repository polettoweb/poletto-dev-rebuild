import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared layout for Open Graph preview images (LinkedIn, Slack, X...).
// Previews are often shown small - LinkedIn renders a link in a comment as a
// compact card - so the design favours a dark, high-contrast panel and a
// large title over detail. Colours mirror the dark theme in globals.css.
const ink = "#1f2924";
const paper = "#f8f6f0";
const accent = "#e08a5c";
const muted = "#b9c2bc";

export const ogSize = { width: 1200, height: 630 };

// next/og's built-in font only ships a regular weight, so fontWeight is
// ignored without these. Read at build time: the images are statically
// exported, so this never runs in the Worker.
export async function loadOgFonts() {
  const dir = join(process.cwd(), "src/lib/fonts");
  const [regular, semibold] = await Promise.all([
    readFile(join(dir, "Geist-Regular.ttf")),
    readFile(join(dir, "Geist-SemiBold.ttf")),
  ]);

  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
  ];
}

type OgCardProps = {
  eyebrow: string;
  title: string;
  footnote?: string;
};

export function titleFontSize(title: string) {
  if (title.length > 80) return 54;
  if (title.length > 50) return 62;
  return 76;
}

export function OgCard({ eyebrow, title, footnote }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: ink,
        fontFamily: "Geist",
      }}
    >
      <div style={{ width: 20, height: "100%", backgroundColor: accent }} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleFontSize(title),
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: -1,
            color: paper,
            maxWidth: 1020,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                backgroundColor: paper,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 31,
                fontWeight: 600,
                color: ink,
              }}
            >
              P
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: paper }}>
              Marco Poletto
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: muted }}>
            {footnote ?? "poletto.dev"}
          </div>
        </div>
      </div>
    </div>
  );
}
