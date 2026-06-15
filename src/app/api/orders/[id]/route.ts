import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { getOrder } from "@/server/services/orders";

export const GET = withAuth(async (_req, uid, context) => {
  const { id } = await context!.params;
  const order = await getOrder(id, uid);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  return NextResponse.json(order);
});
