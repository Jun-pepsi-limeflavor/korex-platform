import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/server/firebase-admin";
import type { ContactInquiryInput } from "@/lib/schemas/contact";

export async function createContactInquiry(data: ContactInquiryInput): Promise<string> {
  const ref = await adminDb.collection("contacts").add({
    ...data,
    phone: data.phone?.trim() || null,
    country: data.country?.trim() || null,
    description: data.description?.trim() || null,
    hearAboutUs: data.hearAboutUs?.trim() || null,
    status: "new",
    createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}
