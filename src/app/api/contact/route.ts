import { NextResponse } from "next/server";
import { contactInquirySchema } from "@/lib/schemas/contact";
import { createContactInquiry } from "@/server/services/contacts";
import { ApiError } from "@/server/lib/api-error";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactInquirySchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid form data.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const id = await createContactInquiry(parsed.data);
    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[API contact]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
