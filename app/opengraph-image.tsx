import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = fs.readFileSync(path.join(process.cwd(), "public", "Rounded.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0b0c",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,106,0,0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(204,85,0,0.25), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={90} height={90} style={{ borderRadius: "50%" }} />
          <div style={{ fontSize: 72, fontWeight: 700, color: "#f4f2ed" }}>
            Cine Invictus
          </div>
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#9c9890" }}>
          Cinematic Video Editing for Creators
        </div>
      </div>
    ),
    { ...size }
  );
}
