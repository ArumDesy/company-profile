import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

type OgParams = {
  eyebrow: string
  title: string
  footer?: string
}

export function renderOgImage({ eyebrow, title, footer }: OgParams) {
  const foot = footer ?? siteConfig.url.replace("https://", "")

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundColor: "#0e151d",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0px",
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(147,163,178,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(147,163,178,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "28px",
            left: "28px",
            right: "28px",
            bottom: "28px",
            display: "flex",
            border: "2px solid #283545",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "28px",
            left: "28px",
            width: "18px",
            height: "18px",
            display: "flex",
            backgroundColor: "#ff6a3d",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "76px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                backgroundColor: "#ff6a3d",
                color: "#0e151d",
                padding: "10px 18px",
                fontFamily: "monospace",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                boxShadow: "7px 7px 0 #0a1018",
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              fontSize: "66px",
              fontWeight: 800,
              color: "#eef3f8",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                width: "140px",
                height: "6px",
                backgroundColor: "#ff6a3d",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#eef3f8",
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ display: "flex" }}>{siteConfig.name}</span>
                <span style={{ display: "flex", color: "#ff6a3d" }}>.</span>
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontSize: "17px",
                  color: "#768799",
                  letterSpacing: "0.04em",
                }}
              >
                {foot}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
