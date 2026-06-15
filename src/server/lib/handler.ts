import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/server/auth/verify-token";
import { ApiError } from "@/server/lib/api-error";

type AuthedHandler = (
  req: NextRequest,
  uid: string,
  context?: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function withAuth(handler: AuthedHandler) {
  return async (
    req: NextRequest,
    context?: { params: Promise<Record<string, string>> }
  ) => {
    try {
      const uid = await verifyAuth(req);
      return await handler(req, uid, context);
    } catch (err) {
      if (err instanceof ApiError) {
        return NextResponse.json({ error: err.message }, { status: err.status });
      }
      console.error("[API]", err);
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
  };
}
