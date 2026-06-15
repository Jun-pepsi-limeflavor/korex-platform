"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserQuotes } from "@/lib/api/client";
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge";
import { PROCESS_LABELS } from "@/types";
import type { Quote } from "@/types";
import { format } from "date-fns";
import { FileText, PlusCircle } from "lucide-react";

export default function QuotesPage() {
  const { userProfile } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile?.id) return;
    getUserQuotes().then((q) => {
      setQuotes(q);
      setLoading(false);
    });
  }, [userProfile?.id]);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">My Quotes</h1>
        <Link
          href="/dashboard/quote/new"
          className="flex items-center gap-2 rounded-md bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          New Quote
        </Link>
      </div>

      <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-sm text-[#6B7280]">Loading quotes...</div>
        ) : quotes.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto mb-3 h-8 w-8 text-[#E5E7EB]" />
            <p className="text-sm text-[#6B7280]">No quotes yet.</p>
            <Link href="/dashboard/quote/new" className="mt-2 inline-block text-sm text-[#0066FF] hover:underline">
              Start your first quote →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Quote ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Service</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Submitted</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Est. Price</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-[#F9FAFB]">
                  <td className="spec-value px-5 py-3.5 text-xs tracking-wide text-[#6B7280]">
                    Q-{q.id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-[#1A1A2E]">
                    {PROCESS_LABELS[q.process]}
                  </td>
                  <td className="px-5 py-3.5">
                    <QuoteStatusBadge status={q.status} />
                  </td>
                  <td className="px-5 py-3.5 text-[#6B7280]">
                    {q.submittedAt ? format(q.submittedAt, "MMM d, yyyy") : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-[#1A1A2E]">
                    {q.pricing ? `$${q.pricing.total.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/dashboard/quote/${q.id}`}
                      className="text-xs text-[#0066FF] hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
