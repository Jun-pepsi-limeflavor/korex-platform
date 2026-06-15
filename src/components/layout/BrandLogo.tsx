import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  className?: string;
};

const sizeClasses = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

export function BrandLogo({
  href,
  size = "lg",
  tone = "dark",
  className,
}: BrandLogoProps) {
  const text = (
    <span
      className={cn(
        "font-serif font-normal tracking-wide font-bold",
        sizeClasses[size],
        tone === "light" ? "text-white" : "text-[#0A1628]",
        className
      )}
    >
      Forma Di Kor
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {text}
      </Link>
    );
  }

  return <div className="inline-flex items-center">{text}</div>;
}
