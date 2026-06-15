import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { getUserOrders } from "@/server/services/orders";

export const GET = withAuth(async (_req, uid) => {
  const orders = await getUserOrders(uid);
  return NextResponse.json(orders);
});
