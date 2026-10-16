import { ImageResponse } from "next/og";

import { loadOgFonts, OgCard, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Marco Poletto - Engineering leadership, in practice";

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Engineering leadership, in practice"
        title="Building teams that stay human as they scale."
      />
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
