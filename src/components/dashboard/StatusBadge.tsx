import { cn } from "@/lib/utils/cn";
import type { QuoteStatus, OrderStatus } from "@/types";
import { QUOTE_STATUS_LABELS, ORDER_STATUS_LABELS } from "@/types";

const QUOTE_COLORS: Record<QuoteStatus, string> = {
  draft: "bg-gray-100 text-gray-600",
  submitted: "bg-blue-100 text-blue-700",
  under_review: "bg-amber-100 text-amber-700",
  quoted: "bg-purple-100 text-purple-700",
  accepted: "bg-green-100 text-green-700",
  expired: "bg-red-100 text-red-600",
  declined: "bg-red-100 text-red-600",
};

const ORDER_COLORS: Record<OrderStatus, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  material_sourced: "bg-amber-100 text-amber-700",
  in_production: "bg-orange-100 text-orange-700",
  qc_inspection: "bg-purple-100 text-purple-700",
  shipped: "bg-cyan-100 text-cyan-700",
  delivered: "bg-green-100 text-green-700",
};

export function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", QUOTE_COLORS[status])}>
      {QUOTE_STATUS_LABELS[status]}
    </span>
  );
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", ORDER_COLORS[status])}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
