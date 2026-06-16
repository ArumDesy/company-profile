import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const runtime = "nodejs"
export const alt = `${siteConfig.name} — Studio web app Next.js & Supabase`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px",
          backgroundColor: "#0e151d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0px",
            backgroundImage:
              "linear-gradient(rgba(31,43,56,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(31,43,56,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "3px",
            height: "630px",
            backgroundColor: "#ff6a3d",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: "14px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ff6a3d",
              fontWeight: 600,
            }}
          >
            Studio · Next.js + Supabase
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: "72px",
              fontWeight: 800,
              color: "#eef3f8",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ display: "flex" }}>{siteConfig.name}</span>
            <span style={{ color: "#ff6a3d", display: "flex" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: "22px",
              color: "#93a3b2",
              lineHeight: 1.4,
              maxWidth: "700px",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "64px",
            display: "flex",
            fontFamily: "monospace",
            fontSize: "13px",
            color: "#344150",
            letterSpacing: "0.05em",
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  )
}
