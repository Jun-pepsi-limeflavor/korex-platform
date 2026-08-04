import { NextResponse } from "next/server";
import { uploadContactFileToDrive } from "@/server/services/upload";
import { appendContactFiles, getContactInquiry } from "@/server/services/contacts";
import { ApiError } from "@/server/lib/api-error";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const contactId = formData.get("contactId") as string | null;
    const email = formData.get("email") as string | null;

    if (!file || !contactId || !email) {
      return NextResponse.json(
        { error: "Missing file, contactId, or email." },
        { status: 400 }
      );
    }

    const inquiry = await getContactInquiry(contactId);
    if (!inquiry) {
      return NextResponse.json({ error: "Contact inquiry not found." }, { status: 404 });
    }

    const inquiryEmail = inquiry.email.toLowerCase();
    if (inquiryEmail !== email.trim().toLowerCase()) {
      return NextResponse.json({ error: "Email does not match this inquiry." }, { status: 403 });
    }

    const result = await uploadContactFileToDrive(
      file,
      inquiry.firstName,
      inquiry.lastName,
      inquiryEmail,
      contactId
    );

    const fileMeta = {
      fileName: result.fileName,
      driveFileId: result.fileId,
      viewUrl: result.viewUrl ?? "",
      uploadedAt: new Date(),
      fileSize: result.fileSize,
    };

    await appendContactFiles(contactId, inquiryEmail, [fileMeta]);

    return NextResponse.json({
      fileId: result.fileId,
      fileName: result.fileName,
      fileSize: result.fileSize,
      viewUrl: result.viewUrl,
      downloadUrl: result.downloadUrl,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    const message = err instanceof Error ? err.message : "Upload failed.";
    console.error("[API contact/upload]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const maxDuration = 60;
