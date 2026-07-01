"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_IMAGES = ["/Hero_01.png", "/Hero_02.png", "/Hero_03.png", "/Hero_04.png"];
const INTERVAL_MS = 7000;
const FADE_MS = 1200;

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover brightness-[0.9]"
            sizes="100vw"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-[#0A1628]/65" />
    </div>
  );
}
