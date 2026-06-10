import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  limit,
} from "firebase/firestore";
import { db } from "./config";
import type { Quote, Order, Manager, User, QuoteStatus, OrderStatus } from "@/types";

// ─── Quotes ──────────────────────────────────────────────────────────────────

export async function createQuote(userId: string, data: Partial<Quote>): Promise<string> {
  const ref = await addDoc(collection(db, "quotes"), {
    ...data,
    userId,
    status: "draft",
    files: [],
    configurations: [],
    qualityRequirements: { fai: false, mtr: false, coc: false, ppap: false },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function submitQuote(quoteId: string): Promise<void> {
  await updateDoc(doc(db, "quotes", quoteId), {
    status: "submitted",
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateQuote(quoteId: string, data: Partial<Quote>): Promise<void> {
  await updateDoc(doc(db, "quotes", quoteId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getQuote(quoteId: string): Promise<Quote | null> {
  const snap = await getDoc(doc(db, "quotes", quoteId));
  if (!snap.exists()) return null;
  return normalizeDoc<Quote>(snap.id, snap.data());
}

export async function getUserQuotes(userId: string): Promise<Quote[]> {
  const q = query(
    collection(db, "quotes"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeDoc<Quote>(d.id, d.data()));
}

export async function getManagerQuotes(managerId: string): Promise<Quote[]> {
  const q = query(
    collection(db, "quotes"),
    where("managerId", "==", managerId),
    where("status", "in", ["submitted", "under_review", "quoted"]),
    orderBy("submittedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeDoc<Quote>(d.id, d.data()));
}

export async function updateQuoteStatus(
  quoteId: string,
  status: QuoteStatus,
  extra?: Record<string, unknown>
): Promise<void> {
  await updateDoc(doc(db, "quotes", quoteId), {
    status,
    updatedAt: serverTimestamp(),
    ...extra,
  });
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function createOrder(quoteId: string, userId: string, promisedShipDate: Date): Promise<string> {
  const ref = await addDoc(collection(db, "orders"), {
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, "orders", orderId));
  if (!snap.exists()) return null;
  return normalizeDoc<Order>(snap.id, snap.data());
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeDoc<Order>(d.id, d.data()));
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  updatedBy: string,
  note?: string
): Promise<void> {
  const snap = await getDoc(doc(db, "orders", orderId));
  if (!snap.exists()) return;
  const current = snap.data();
  const history = current.statusHistory || [];

  await updateDoc(doc(db, "orders", orderId), {
    status,
    statusHistory: [
      ...history,
      { status, updatedAt: Timestamp.now(), updatedBy, note: note || "" },
    ],
    updatedAt: serverTimestamp(),
  });
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getAllUsers(): Promise<User[]> {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => normalizeDoc<User>(d.id, d.data()));
}

export async function getUser(userId: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", userId));
  if (!snap.exists()) return null;
  return normalizeDoc<User>(snap.id, snap.data());
}

export async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  await updateDoc(doc(db, "users", userId), data);
}

// ─── Managers ─────────────────────────────────────────────────────────────────

export async function getManager(managerId: string): Promise<Manager | null> {
  const snap = await getDoc(doc(db, "managers", managerId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Manager;
}

export async function getAllManagers(): Promise<Manager[]> {
  const snap = await getDocs(collection(db, "managers"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Manager));
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeDoc<T>(id: string, data: Record<string, unknown>): T {
  const normalized: Record<string, unknown> = { id };
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      normalized[key] = value.toDate();
    } else if (Array.isArray(value)) {
      normalized[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? normalizeNestedDoc(item as Record<string, unknown>)
          : item
      );
    } else {
      normalized[key] = value;
    }
  }
  return normalized as T;
}

function normalizeNestedDoc(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = value instanceof Timestamp ? value.toDate() : value;
  }
  return result;
}
