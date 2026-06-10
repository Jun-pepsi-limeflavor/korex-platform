"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/lib/firebase/firestore";
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge";
import type { Order } from "@/types";
import { format } from "date-fns";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile?.id) return;
    getUserOrders(userProfile.id).then((o) => {
      setOrders(o);
      setLoading(false);
    });
  }, [userProfile?.id]);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-[#1A1A2E]">My Orders</h1>

      <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-sm text-[#6B7280]">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center">
            <Package className="mx-auto mb-3 h-8 w-8 text-[#E5E7EB]" />
            <p className="text-sm text-[#6B7280]">No orders yet.</p>
            <Link href="/dashboard/quote/new" className="mt-2 inline-block text-sm text-[#0066FF] hover:underline">
              Start a quote →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F7F9FC]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Order ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Ship Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Tracking</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-[#F9FAFB]">
                  <td className="spec-value px-5 py-3.5 text-xs tracking-wide text-[#6B7280]">
                    ORD-{o.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-5 py-3.5">
                    <OrderStatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3.5 text-[#6B7280]">
                    {format(o.promisedShipDate, "MMM d, yyyy")}
                  </td>
                  <td className="px-5 py-3.5 text-[#6B7280]">
                    {o.tracking ? (
                      <a
                        href={o.tracking.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0066FF] hover:underline"
                      >
                        {o.tracking.carrier} {o.tracking.trackingNumber}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/dashboard/orders/${o.id}`}
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
