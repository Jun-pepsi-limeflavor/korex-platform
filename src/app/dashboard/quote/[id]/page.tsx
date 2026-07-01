"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getQuote, acceptQuote } from "@/lib/api/client";
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge";
import { PROCESS_LABELS } from "@/types";
import type { Quote } from "@/types";
import { format, addBusinessDays } from "date-fns";
import { Download, ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";
import { use } from "react";

export default function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    getQuote(id).then((q) => {
      setQuote(q);
      setLoading(false);
    });
  }, [id]);

  const handleAccept = async () => {
    if (!quote) return;
    setAccepting(true);
    try {
      const shipDate = addBusinessDays(new Date(), quote.pricing?.leadTimeDays ?? 14);
      const orderId = await acceptQuote(quote.id, shipDate);
      router.push(`/dashboard/orders/${orderId}`);
    } catch {
      setAccepting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-sm text-[#6B7280]">Loading quote...</div>;
  }

  if (!quote) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#6B7280]">Quote not found.</p>
        <Link href="/dashboard/quotes" className="mt-2 inline-block text-sm text-[#0066FF] hover:underline">← Back to Quotes</Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/dashboard/quotes" className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1A1A2E]">
          <ArrowLeft className="h-4 w-4" /> My Quotes
        </Link>
        <QuoteStatusBadge status={quote.status} />
      </div>

      <h1 className="mb-1 text-2xl font-bold text-[#1A1A2E]">
        Quote Q-{quote.id.slice(-8).toUpperCase()}
      </h1>
      <p className="mb-8 text-sm text-[#6B7280]">
        {PROCESS_LABELS[quote.process]}
        {quote.submittedAt && ` · Submitted ${format(quote.submittedAt, "MMMM d, yyyy")}`}
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">

          {/* Specifications */}
          <div className="rounded-sm border border-[#E5E7EB] bg-white p-5">
            <h2 className="mb-4 font-semibold text-[#1A1A2E]">Specifications</h2>
            {quote.configurations.map((cfg, i) => (
              <div key={i} className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Part Name</span>
                  <span className="font-medium">{cfg.partName || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Material</span>
                  <span className="font-medium">{cfg.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Surface Finish</span>
                  <span className="font-medium">{cfg.finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Tolerance</span>
                  <span className="spec-value font-semibold text-[#0066FF]">{cfg.toleranceClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Quantity</span>
                  <span className="font-medium">{cfg.quantity} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Target Delivery</span>
                  <span className="font-medium">
                    {cfg.targetDate instanceof Date
                      ? format(cfg.targetDate, "MMM d, yyyy")
                      : cfg.targetDate}
                  </span>
                </div>
              </div>
            ))}

            {/* Quality docs */}
            {quote.qualityRequirements && (
              <div className="mt-4 border-t border-[#E5E7EB] pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#6B7280]">Quality Documentation Requested</p>
                <div className="flex flex-wrap gap-2">
                  {quote.qualityRequirements.fai && <span className="rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">FAI Report</span>}
                  {quote.qualityRequirements.mtr && <span className="rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">Material Test Report</span>}
                  {quote.qualityRequirements.coc && <span className="rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">Certificate of Conformance</span>}
                  {quote.qualityRequirements.ppap && <span className="rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">PPAP</span>}
                </div>
              </div>
            )}
          </div>

          {/* Uploaded files */}
          {quote.files.length > 0 && (
            <div className="rounded-sm border border-[#E5E7EB] bg-white p-5">
              <h2 className="mb-3 font-semibold text-[#1A1A2E]">Uploaded Files</h2>
              <div className="space-y-2">
                {quote.files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between rounded-sm bg-[#F7F9FC] px-3 py-2">
                    <span className="text-sm text-[#1A1A2E]">{f.fileName}</span>
                    <a
                      href={f.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066FF] hover:text-blue-700"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manager notes */}
          {quote.managerNotes && (
            <div className="rounded-sm border border-amber-200 bg-amber-50 p-5">
              <h2 className="mb-2 font-semibold text-amber-900">DFM Feedback from Account Manager</h2>
              <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">{quote.managerNotes}</p>
            </div>
          )}
        </div>

        {/* Pricing panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-sm border border-[#E5E7EB] bg-white p-5 shadow-sm">
            {quote.status === "quoted" && quote.pricing ? (
              <>
                <h2 className="mb-4 font-semibold text-[#1A1A2E]">Quote Pricing</h2>
                <dl className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Unit Price</dt>
                    <dd className="font-medium">${quote.pricing.unitPrice.toLocaleString()}</dd>
                  </div>
                  {quote.pricing.toolingCost > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-[#6B7280]">Tooling Cost</dt>
                      <dd className="font-medium">${quote.pricing.toolingCost.toLocaleString()}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[#E5E7EB] pt-2">
                    <dt className="font-semibold text-[#1A1A2E]">Total</dt>
                    <dd className="font-bold text-lg text-[#1A1A2E]">${quote.pricing.total.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Lead Time</dt>
                    <dd className="font-medium text-[#0066FF]">{quote.pricing.leadTimeDays} business days</dd>
                  </div>
                </dl>
                {quote.quoteExpiresAt && (
                  <p className="mb-4 text-xs text-amber-600">
                    Quote valid until {format(quote.quoteExpiresAt, "MMM d, yyyy")}
                  </p>
                )}
                <button
                  onClick={handleAccept}
                  disabled={accepting}
                  className="mb-2 flex w-full items-center justify-center gap-2 rounded-sm bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle className="h-4 w-4" />
                  {accepting ? "Confirming..." : "Accept Quote → Convert to Order"}
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F7F9FC]">
                  <RefreshCw className="h-4 w-4" />
                  Request Revision
                </button>
                <button className="mt-2 flex w-full items-center justify-center gap-1 text-xs text-[#6B7280] hover:text-[#1A1A2E]">
                  <Download className="h-3 w-3" /> Download Quote PDF
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-[#EEF4FF]">
                  <QuoteStatusBadge status={quote.status} />
                </div>
                <p className="text-sm text-[#6B7280]">
                  {quote.status === "submitted" || quote.status === "under_review"
                    ? "Your quote is being reviewed. Response within 24 business hours."
                    : quote.status === "accepted"
                    ? "This quote has been accepted and converted to an order."
                    : "Quote pricing not yet available."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
