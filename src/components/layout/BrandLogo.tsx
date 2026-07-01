import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
};

const sizeHeights = {
  sm: 28,
  md: 32,
  lg: 40,
} as const;

const logoSources = {
  dark: "/logo.png",
  light: "/logo_white.png",
} as const;

export function BrandLogo({
  href,
  size = "lg",
  tone = "dark",
  className,
}: BrandLogoProps) {
  const height = sizeHeights[size];

  const logo = (
    <Image
      src={logoSources[tone]}
      alt="Forma Di Kor"
      width={Math.round(height * 3.2)}
      height={height}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height }}
      priority={size === "lg"}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {logo}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{logo}</div>;
}
