"use client";
import dynamic from "next/dynamic";

export const ThreeBackgroundClient = dynamic(
  async () => {
    const { ThreeBackground } = await import("./ThreeBackground");
    return ThreeBackground;
  },
  { ssr: false }
);
