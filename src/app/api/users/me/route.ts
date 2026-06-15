import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { getUser, updateUser } from "@/server/services/users";

export const GET = withAuth(async (_req, uid) => {
  const user = await getUser(uid);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  return NextResponse.json(user);
});

export const PATCH = withAuth(async (req, uid) => {
  const body = await req.json();
  await updateUser(uid, body);
  const user = await getUser(uid);
  return NextResponse.json(user);
});
