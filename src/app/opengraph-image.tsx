import { ImageResponse } from "next/og";

export const alt =
  "Apriori — the simulation model that out-predicts GPT-5.5 and Claude";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#F5D76E";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(ellipse at 25% 30%, rgba(245,215,110,0.16) 0%, rgba(0,0,0,0) 60%)",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: GOLD, letterSpacing: "-0.01em" }}>
          aprıorı
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
            <span style={{ fontSize: 168, fontWeight: 800, color: GOLD, letterSpacing: "-0.04em", lineHeight: 1 }}>
              0.783
            </span>
            <span style={{ fontSize: 30, color: "#7A7368" }}>
              vs 0.459 Claude · 0.482 GPT-5.5
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 600, color: "#F5E6A8", marginTop: 20, letterSpacing: "-0.02em", maxWidth: 980, lineHeight: 1.15 }}>
            The simulation model that out-predicts GPT-5.5 and Claude.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#7A7368" }}>
          <span style={{ display: "flex" }}>Screen-conditioned action prediction · PiSAR benchmark</span>
          <span style={{ display: "flex" }}>arXiv:2605.29400</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
