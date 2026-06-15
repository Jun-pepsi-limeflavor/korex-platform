import type { NextRequest } from "next/server";
import { adminAuth } from "@/server/firebase-admin";
import { ApiError } from "@/server/lib/api-error";

export async function verifyAuth(req: NextRequest): Promise<string> {
  const header = req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Missing or invalid authorization header.");
  }

  const token = header.slice(7);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    throw new ApiError(401, "Invalid or expired token.");
  }
}
