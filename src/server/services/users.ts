import { adminDb } from "@/server/firebase-admin";
import { normalizeDoc } from "@/server/lib/normalize";
import { ApiError } from "@/server/lib/api-error";
import type { User } from "@/types";

export async function getUser(userId: string): Promise<User | null> {
  const snap = await adminDb.collection("users").doc(userId).get();
  if (!snap.exists) return null;
  return normalizeDoc<User>(snap.id, snap.data()!);
}

export async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  const ref = adminDb.collection("users").doc(userId);
  const snap = await ref.get();
  if (!snap.exists) {
    throw new ApiError(404, "User not found.");
  }

  const { id: _id, createdAt: _createdAt, email: _email, role: _role, ...safeData } = data as User;
  await ref.update(safeData);
}
