import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { getQuote, updateQuote } from "@/server/services/quotes";

export const GET = withAuth(async (_req, uid, context) => {
  const { id } = await context!.params;
  const quote = await getQuote(id, uid);
  if (!quote) {
    return NextResponse.json({ error: "Quote not found." }, { status: 404 });
  }
  return NextResponse.json(quote);
});

export const PATCH = withAuth(async (req, uid, context) => {
  const { id } = await context!.params;
  const body = await req.json();
  await updateQuote(id, uid, body);
  return NextResponse.json({ ok: true });
});
