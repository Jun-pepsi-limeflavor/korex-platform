import { NextResponse } from "next/server";
import { withAuth } from "@/server/lib/handler";
import { uploadQuoteFileToDrive } from "@/server/services/upload";

export const POST = withAuth(async (req, uid) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const quoteId = formData.get("quoteId") as string | null;

  if (!file || !quoteId) {
    return NextResponse.json({ error: "Missing file or quoteId." }, { status: 400 });
  }

  try {
    const result = await uploadQuoteFileToDrive(file, uid, quoteId);
    return NextResponse.json({
      fileId: result.fileId,
      fileName: result.fileName,
      fileSize: result.fileSize,
      viewUrl: result.viewUrl,
      downloadUrl: result.downloadUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
});

export const maxDuration = 60;
