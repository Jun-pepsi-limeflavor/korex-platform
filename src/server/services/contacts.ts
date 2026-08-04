import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/server/firebase-admin";
import { ApiError } from "@/server/lib/api-error";
import type { ContactInquiryInput } from "@/lib/schemas/contact";
import type { QuoteFile } from "@/types";

function emptyToNull(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function createContactInquiry(data: ContactInquiryInput): Promise<string> {
  const ref = await adminDb.collection("contacts").add({
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    company: emptyToNull(data.company),
    phone: emptyToNull(data.phone),
    country: emptyToNull(data.country),
    process: emptyToNull(data.process),
    volume: emptyToNull(data.volume),
    description: emptyToNull(data.description),
    hearAboutUs: emptyToNull(data.hearAboutUs),
    files: [],
    status: "new",
    createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export type ContactInquiryRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  process?: string | null;
  volume?: string | null;
  description?: string | null;
  hearAboutUs?: string | null;
  files?: QuoteFile[];
  status?: string;
};

export async function getContactInquiry(
  contactId: string
): Promise<ContactInquiryRecord | null> {
  const snap = await adminDb.collection("contacts").doc(contactId).get();
  if (!snap.exists) return null;
  const data = snap.data()!;
  return {
    id: snap.id,
    firstName: String(data.firstName ?? ""),
    lastName: String(data.lastName ?? ""),
    email: String(data.email ?? ""),
    company: data.company ?? null,
    phone: data.phone ?? null,
    country: data.country ?? null,
    process: data.process ?? null,
    volume: data.volume ?? null,
    description: data.description ?? null,
    hearAboutUs: data.hearAboutUs ?? null,
    files: data.files ?? [],
    status: data.status,
  };
}

export async function appendContactFiles(
  contactId: string,
  email: string,
  files: QuoteFile[]
): Promise<void> {
  const ref = adminDb.collection("contacts").doc(contactId);
  const snap = await ref.get();
  if (!snap.exists) {
    throw new ApiError(404, "Contact inquiry not found.");
  }

  const data = snap.data()!;
  if ((data.email as string)?.toLowerCase() !== email.trim().toLowerCase()) {
    throw new ApiError(403, "Email does not match this inquiry.");
  }

  if (files.length === 0) return;

  await ref.update({
    files: FieldValue.arrayUnion(...files),
  });
}
