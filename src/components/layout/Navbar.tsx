"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/firebase/auth";
import { BrandLogo } from "@/components/layout/BrandLogo";

const NAV_LINKS = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Industries", href: "/industries" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { firebaseUser, userProfile } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <BrandLogo href="/" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#0066FF]",
                  pathname.startsWith(link.href)
                    ? "text-[#0066FF]"
                    : "text-[#6B7280]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {firebaseUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-sm border border-[#E5E7EB] px-3 py-1.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F7F9FC]"
                >
                  <span>{userProfile?.firstName ?? "Account"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-sm border border-[#E5E7EB] bg-white shadow-lg">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-[#1A1A2E] hover:bg-[#F7F9FC]"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-[#1A1A2E] hover:bg-[#F7F9FC]"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <hr className="my-1 border-[#E5E7EB]" />
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E]"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-sm bg-[#0066FF] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Get a Quote
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-[#6B7280]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-[#E5E7EB]" />
          {firebaseUser ? (
            <>
              <Link href="/dashboard" className="block text-sm font-medium text-[#1A1A2E]" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="block text-sm font-medium text-red-600">Log Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-sm font-medium text-[#6B7280]" onClick={() => setMobileOpen(false)}>Log In</Link>
              <Link href="/signup" className="block rounded-sm bg-[#0066FF] px-4 py-2 text-center text-sm font-medium text-white" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
