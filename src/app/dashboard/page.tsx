"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Upload, Phone, FileText, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserQuotes, getUserOrders } from "@/lib/api/client";
import { QuoteStatusBadge, OrderStatusBadge } from "@/components/dashboard/StatusBadge";
import { PROCESS_LABELS } from "@/types";
import type { Quote, Order } from "@/types";
import { format } from "date-fns";

export default function DashboardPage() {
  const { userProfile } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!userProfile?.id) return;
    Promise.all([getUserQuotes(), getUserOrders()]).then(([q, o]) => {
      setQuotes(q.slice(0, 5));
      setOrders(o.slice(0, 5));
      setLoadingData(false);
    });
  }, [userProfile?.id]);

  const activeQuotes = quotes.filter((q) =>
    ["submitted", "under_review", "quoted"].includes(q.status)
  );

  return (
    <div className="p-8">
      {/* Welcome banner */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-[#0A1628] to-[#0D2547] p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {userProfile?.firstName ?? "there"}.
        </h1>
        <p className="mt-1 text-sm text-gray-300">
          Your formadikor dashboard — quotes, orders, and account management in one place.
        </p>
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/quote/new"
          className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-5 hover:border-[#0066FF]/30 hover:shadow-sm transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF4FF]">
            <PlusCircle className="h-5 w-5 text-[#0066FF]" />
          </div>
          <div>
            <p className="font-semibold text-[#1A1A2E]">Start New Quote</p>
            <p className="text-xs text-[#6B7280]">Upload CAD file or drawing</p>
          </div>
        </Link>

        <Link
          href="/dashboard/quote/new"
          className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-5 hover:border-[#0066FF]/30 hover:shadow-sm transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0FFF4]">
            <Upload className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-[#1A1A2E]">Upload Drawing</p>
            <p className="text-xs text-[#6B7280]">PDF, DXF, DWG supported</p>
          </div>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-5 hover:border-[#0066FF]/30 hover:shadow-sm transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
            <Phone className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-[#1A1A2E]">Talk to Your Manager</p>
            <p className="text-xs text-[#6B7280]">Direct line to your account team</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Active Quotes */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#6B7280]" />
              <h2 className="font-semibold text-[#1A1A2E]">Active Quotes</h2>
            </div>
            <Link href="/dashboard/quotes" className="text-xs text-[#0066FF] hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {loadingData ? (
              <div className="px-5 py-8 text-center text-sm text-[#6B7280]">Loading...</div>
            ) : activeQuotes.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[#6B7280]">No active quotes.</p>
                <Link href="/dashboard/quote/new" className="mt-2 inline-block text-sm text-[#0066FF] hover:underline">
                  Start your first quote →
                </Link>
              </div>
            ) : (
              activeQuotes.map((q) => (
                <Link
                  key={q.id}
                  href={`/dashboard/quote/${q.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-[#F9FAFB] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1A1A2E]">
                      {PROCESS_LABELS[q.process]}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {q.submittedAt ? `Submitted ${format(q.submittedAt, "MMM d")}` : "Draft"}
                    </p>
                  </div>
                  <QuoteStatusBadge status={q.status} />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-[#6B7280]" />
              <h2 className="font-semibold text-[#1A1A2E]">Recent Orders</h2>
            </div>
            <Link href="/dashboard/orders" className="text-xs text-[#0066FF] hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {loadingData ? (
              <div className="px-5 py-8 text-center text-sm text-[#6B7280]">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[#6B7280]">No orders yet.</p>
              </div>
            ) : (
              orders.map((o) => (
                <Link
                  key={o.id}
                  href={`/dashboard/orders/${o.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-[#F9FAFB] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1A1A2E]">
                      Order #{o.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      Ships {format(o.promisedShipDate, "MMM d, yyyy")}
                    </p>
                  </div>
                  <OrderStatusBadge status={o.status} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
