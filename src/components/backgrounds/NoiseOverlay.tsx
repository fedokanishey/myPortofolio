"use client";

import React from "react";

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="hidden sm:block absolute inset-0 pointer-events-none bg-noise-texture opacity-[0.035] dark:opacity-[0.025]"
      style={{ contain: "strict" }}
    />
  );
}
