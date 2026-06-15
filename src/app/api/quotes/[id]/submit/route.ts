import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { submitQuote } from "@/server/services/quotes";

export const POST = withAuth(async (_req, uid, context) => {
  const { id } = await context!.params;
  await submitQuote(id, uid);
  return NextResponse.json({ ok: true });
});
