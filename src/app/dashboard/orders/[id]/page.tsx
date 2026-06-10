"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrder } from "@/lib/firebase/firestore";
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge";
import { ORDER_STATUS_LABELS } from "@/types";
import type { Order, OrderStatus } from "@/types";
import { format } from "date-fns";
import { Download, ExternalLink, ArrowLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { use } from "react";

const ORDER_STEPS: OrderStatus[] = [
  "confirmed", "material_sourced", "in_production", "qc_inspection", "shipped", "delivered"
];

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id).then((o) => {
      setOrder(o);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8 text-sm text-[#6B7280]">Loading order...</div>;
  if (!order) return (
    <div className="p-8 text-center">
      <p className="text-[#6B7280]">Order not found.</p>
      <Link href="/dashboard/orders" className="mt-2 inline-block text-sm text-[#0066FF]">← Back</Link>
    </div>
  );

  const currentStepIndex = ORDER_STEPS.indexOf(order.status);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/dashboard/orders" className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1A1A2E]">
          <ArrowLeft className="h-4 w-4" /> My Orders
        </Link>
        <OrderStatusBadge status={order.status} />
      </div>

      <h1 className="mb-1 text-2xl font-bold text-[#1A1A2E]">
        Order ORD-{order.id.slice(-6).toUpperCase()}
      </h1>
      <p className="mb-8 text-sm text-[#6B7280]">
        Confirmed {format(order.createdAt, "MMMM d, yyyy")} · Promised ship date{" "}
        <strong>{format(order.promisedShipDate, "MMMM d, yyyy")}</strong>
      </p>

      {/* Status Timeline */}
      <div className="mb-8 rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="mb-6 font-semibold text-[#1A1A2E]">Production Status</h2>
        <div className="relative flex items-start justify-between">
          {/* Track line */}
          <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-[#E5E7EB]" />
          <div
            className="absolute top-3.5 left-0 h-0.5 bg-[#0066FF] transition-all"
            style={{ width: `${(currentStepIndex / (ORDER_STEPS.length - 1)) * 100}%` }}
          />

          {ORDER_STEPS.map((step, i) => {
            const done = i <= currentStepIndex;
            const current = i === currentStepIndex;
            return (
              <div key={step} className="relative flex flex-col items-center flex-1">
                <div className={cn(
                  "relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold",
                  done
                    ? "border-[#0066FF] bg-[#0066FF] text-white"
                    : "border-[#E5E7EB] bg-white text-[#6B7280]",
                  current && "ring-4 ring-blue-100"
                )}>
                  {done ? "✓" : i + 1}
                </div>
                <p className={cn(
                  "mt-2 text-center text-xs leading-tight max-w-[70px]",
                  done ? "font-medium text-[#1A1A2E]" : "text-[#6B7280]"
                )}>
                  {ORDER_STATUS_LABELS[step]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">

          {/* Production Updates Log */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
            <h2 className="mb-4 font-semibold text-[#1A1A2E]">Production Updates</h2>
            {order.statusHistory.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No updates yet.</p>
            ) : (
              <div className="space-y-4">
                {[...order.statusHistory].reverse().map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-[#0066FF] mt-1.5" />
                      {i < order.statusHistory.length - 1 && (
                        <div className="flex-1 w-px bg-[#E5E7EB] my-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-[#1A1A2E]">
                        {ORDER_STATUS_LABELS[entry.status]}
                      </p>
                      {entry.note && (
                        <p className="text-sm text-[#6B7280] mt-0.5">{entry.note}</p>
                      )}
                      <p className="mt-0.5 text-xs text-[#6B7280]">
                        {format(entry.updatedAt, "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documents */}
          {order.documents.length > 0 && (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h2 className="mb-3 font-semibold text-[#1A1A2E]">Documents</h2>
              <div className="space-y-2">
                {order.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md bg-[#F7F9FC] px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-[#1A1A2E]">{doc.fileName}</p>
                      <p className="text-xs text-[#6B7280] capitalize">{doc.type.replace(/_/g, " ")}</p>
                    </div>
                    <a
                      href={doc.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[#0066FF] hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-4 lg:col-span-1">
          {/* Tracking */}
          {order.tracking ? (
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h2 className="mb-3 font-semibold text-[#1A1A2E]">Shipment Tracking</h2>
              <p className="text-sm text-[#6B7280]">
                {order.tracking.carrier} · {order.tracking.trackingNumber}
              </p>
              <a
                href={order.tracking.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1 text-sm text-[#0066FF] hover:underline"
              >
                Track Shipment <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-5 text-center">
              <p className="text-sm text-[#6B7280]">Tracking info will appear once shipped.</p>
            </div>
          )}

          {/* Reorder */}
          <Link
            href={`/dashboard/quote/new`}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-medium text-[#1A1A2E] hover:border-[#0066FF]/30 hover:shadow-sm transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Reorder This Part
          </Link>
        </div>
      </div>
    </div>
  );
}
