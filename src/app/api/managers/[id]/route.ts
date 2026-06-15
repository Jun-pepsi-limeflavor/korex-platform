import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { getManagerForUser } from "@/server/services/managers";

export const GET = withAuth(async (_req, uid, context) => {
  const { id } = await context!.params;
  const manager = await getManagerForUser(id, uid);
  if (!manager) {
    return NextResponse.json({ error: "Manager not found." }, { status: 404 });
  }
  return NextResponse.json(manager);
});
