import { adminDb } from "@/server/firebase-admin";
import type { Manager } from "@/types";
import { ApiError } from "@/server/lib/api-error";

export async function getManager(managerId: string): Promise<Manager | null> {
  const snap = await adminDb.collection("managers").doc(managerId).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Manager;
}

export async function getManagerForUser(
  managerId: string,
  userId: string
): Promise<Manager | null> {
  const userSnap = await adminDb.collection("users").doc(userId).get();
  if (!userSnap.exists || userSnap.data()?.assignedManagerId !== managerId) {
    throw new ApiError(403, "Access denied.");
  }

  return getManager(managerId);
}
