import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/server/firebase-admin";
import { normalizeDoc } from "@/server/lib/normalize";
import { ApiError } from "@/server/lib/api-error";
import type { Quote, QuoteStatus } from "@/types";

export async function createQuote(userId: string, data: Partial<Quote>): Promise<string> {
  const ref = await adminDb.collection("quotes").add({
    ...data,
    userId,
    status: "draft",
    files: [],
    configurations: [],
    qualityRequirements: { fai: false, mtr: false, coc: false, ppap: false },
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function submitQuote(quoteId: string, userId: string): Promise<void> {
  const ref = adminDb.collection("quotes").doc(quoteId);
  const snap = await ref.get();
  if (!snap.exists || snap.data()?.userId !== userId) {
    throw new ApiError(404, "Quote not found.");
  }

  await ref.update({
    status: "submitted",
    submittedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function updateQuote(
  quoteId: string,
  userId: string,
  data: Partial<Quote>
): Promise<void> {
  const ref = adminDb.collection("quotes").doc(quoteId);
  const snap = await ref.get();
  if (!snap.exists || snap.data()?.userId !== userId) {
    throw new ApiError(404, "Quote not found.");
  }

  await ref.update({
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function getQuote(quoteId: string, userId: string): Promise<Quote | null> {
  const snap = await adminDb.collection("quotes").doc(quoteId).get();
  if (!snap.exists) return null;
  const data = snap.data()!;
  if (data.userId !== userId) return null;
  return normalizeDoc<Quote>(snap.id, data);
}

export async function getUserQuotes(userId: string): Promise<Quote[]> {
  const snap = await adminDb
    .collection("quotes")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  return snap.docs.map((d) => normalizeDoc<Quote>(d.id, d.data()));
}

export async function updateQuoteStatus(
  quoteId: string,
  userId: string,
  status: QuoteStatus,
  extra?: Record<string, unknown>
): Promise<void> {
  const ref = adminDb.collection("quotes").doc(quoteId);
  const snap = await ref.get();
  if (!snap.exists || snap.data()?.userId !== userId) {
    throw new ApiError(404, "Quote not found.");
  }

  await ref.update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
    ...extra,
  });
}
