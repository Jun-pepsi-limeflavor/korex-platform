import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { updateQuoteStatus } from "@/server/services/quotes";
import { createOrder } from "@/server/services/orders";

export const POST = withAuth(async (req, uid, context) => {
  const { id } = await context!.params;
  const body = await req.json();
  const promisedShipDate = new Date(body.promisedShipDate);

  if (Number.isNaN(promisedShipDate.getTime())) {
    return NextResponse.json({ error: "Invalid promisedShipDate." }, { status: 400 });
  }

  await updateQuoteStatus(id, uid, "accepted");
  const orderId = await createOrder(id, uid, promisedShipDate);

  return NextResponse.json({ orderId });
});
