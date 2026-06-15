import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { createQuote, getUserQuotes } from "@/server/services/quotes";

export const GET = withAuth(async (_req, uid) => {
  const quotes = await getUserQuotes(uid);
  return NextResponse.json(quotes);
});

export const POST = withAuth(async (req, uid) => {
  const body = await req.json();
  const id = await createQuote(uid, body);
  return NextResponse.json({ id }, { status: 201 });
});
