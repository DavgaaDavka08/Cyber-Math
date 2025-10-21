"use client";

import Image from "next/image";
import * as React from "react";

/**
 * Background layer for Cyber Math UI.
 * - Full bleed hero image
 * - Soft yellow gradient overlay
 * - Optional sticker decorations on large screens
 */
export function CyberBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Hero background */}
      <Image
        src="/public/Group 1171275691 (2).svg"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-90"
      />

      {/* Soft yellow gradient wash for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,242,170,0.85)_0%,rgba(255,230,120,0.65)_35%,rgba(255,204,0,0.35)_75%,transparent_100%)]" />

      {/* Decorative stickers (hidden on small screens) */}
      <Image
        src="/cyber/stickers.svg"
        alt=""
        width={420}
        height={595}
        className="absolute left-[-28px] top-[72px] rotate-[-8deg] opacity-90 hidden md:block"
      />
      <Image
        src="/cyber/stickers.svg"
        alt=""
        width={320}
        height={454}
        className="absolute right-[-36px] bottom-[36px] rotate-[10deg] opacity-70 hidden lg:block"
      />
    </div>
  );
}
