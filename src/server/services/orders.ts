import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/server/firebase-admin";
import { normalizeDoc } from "@/server/lib/normalize";
import { ApiError } from "@/server/lib/api-error";
import type { Order, OrderStatus } from "@/types";

export async function createOrder(
  quoteId: string,
  userId: string,
  promisedShipDate: Date
): Promise<string> {
  const ref = await adminDb.collection("orders").add({
    quoteId,
    userId,
    status: "confirmed",
    statusHistory: [
      {
        status: "confirmed",
        updatedAt: Timestamp.now(),
        updatedBy: "system",
        note: "Order confirmed from accepted quote.",
      },
    ],
    promisedShipDate: Timestamp.fromDate(promisedShipDate),
    documents: [],
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function getOrder(orderId: string, userId: string): Promise<Order | null> {
  const snap = await adminDb.collection("orders").doc(orderId).get();
  if (!snap.exists) return null;
  const data = snap.data()!;
  if (data.userId !== userId) return null;
  return normalizeDoc<Order>(snap.id, data);
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const snap = await adminDb
    .collection("orders")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  return snap.docs.map((d) => normalizeDoc<Order>(d.id, d.data()));
}

export async function updateOrderStatus(
  orderId: string,
  userId: string,
  status: OrderStatus,
  updatedBy: string,
  note?: string
): Promise<void> {
  const ref = adminDb.collection("orders").doc(orderId);
  const snap = await ref.get();
  if (!snap.exists || snap.data()?.userId !== userId) {
    throw new ApiError(404, "Order not found.");
  }

  const current = snap.data()!;
  const history = current.statusHistory || [];

  await ref.update({
    status,
    statusHistory: [
      ...history,
      { status, updatedAt: Timestamp.now(), updatedBy, note: note || "" },
    ],
    updatedAt: FieldValue.serverTimestamp(),
  });
}
