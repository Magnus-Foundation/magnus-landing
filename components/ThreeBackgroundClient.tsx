"use client";
import dynamic from "next/dynamic";

export const ThreeBackgroundClient = dynamic(
  () =>
    import("./ThreeBackground").then((m) => ({ default: m.ThreeBackground })),
  { ssr: false }
);
