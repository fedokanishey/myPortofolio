"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export function ScrollProgressBar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 inset-x-0 z-[100] h-[3.5px] bg-transparent pointer-events-none">
      <motion.div
        key={pathname}
        style={{ scaleX }}
        className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 origin-left shadow-[0_0_12px_rgba(99,102,241,0.8)]"
      />
    </div>
  );
}

