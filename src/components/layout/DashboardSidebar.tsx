"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Package,
  FolderOpen,
  User,
  HelpCircle,
  LogOut,
  MessageSquare,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/firebase/auth";
import { useState, useEffect } from "react";
import { getManager } from "@/lib/firebase/firestore";
import type { Manager } from "@/types";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: PlusCircle, label: "New Quote", href: "/dashboard/quote/new" },
  { icon: FileText, label: "My Quotes", href: "/dashboard/quotes" },
  { icon: Package, label: "My Orders", href: "/dashboard/orders" },
  { icon: FolderOpen, label: "Documents", href: "/dashboard/documents" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile } = useAuth();
  const [manager, setManager] = useState<Manager | null>(null);

  useEffect(() => {
    if (userProfile?.assignedManagerId) {
      getManager(userProfile.assignedManagerId).then(setManager);
    }
  }, [userProfile?.assignedManagerId]);

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#E5E7EB] bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#E5E7EB] px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#0A1628]">
            <span className="text-xs font-bold text-white">KX</span>
          </div>
          <span className="text-base font-bold text-[#0A1628] tracking-tight">KOREX</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#EEF4FF] text-[#0066FF]"
                      : "text-[#6B7280] hover:bg-[#F7F9FC] hover:text-[#1A1A2E]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Account Manager Card */}
      <div className="border-t border-[#E5E7EB] px-3 py-4">
        {manager ? (
          <div className="rounded-md bg-[#F7F9FC] p-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Your Account Manager
            </p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-white text-xs font-bold">
                {manager.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A2E]">{manager.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={`mailto:${manager.email}`}
                className="flex-1 flex items-center justify-center gap-1 rounded border border-[#E5E7EB] px-2 py-1 text-xs text-[#6B7280] hover:bg-white"
              >
                <Mail className="h-3 w-3" />
                Email
              </a>
              <a
                href={`tel:${manager.phone}`}
                className="flex-1 flex items-center justify-center gap-1 rounded border border-[#E5E7EB] px-2 py-1 text-xs text-[#6B7280] hover:bg-white"
              >
                <MessageSquare className="h-3 w-3" />
                Call
              </a>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-[#F7F9FC] p-3 text-xs text-[#6B7280]">
            <p className="font-medium text-[#1A1A2E] mb-1">Account Manager</p>
            <p>Being assigned — we&apos;ll notify you shortly.</p>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="border-t border-[#E5E7EB] px-3 py-3 space-y-1">
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#6B7280] hover:bg-[#F7F9FC]"
        >
          <HelpCircle className="h-4 w-4" />
          Help Center
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
