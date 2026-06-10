import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

const ALLOWED_EXTENSIONS = new Set([
  ".step", ".stp", ".iges", ".igs", ".stl", ".obj", ".3mf",
  ".dxf", ".dwg", ".pdf", ".zip", ".rar",
]);

const MAX_FILE_SIZE = 500 * 1024 * 1024;

function getAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error("Google Drive credentials not configured.");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
}

async function getOrCreateFolder(
  drive: ReturnType<typeof google.drive>,
  parentFolderId: string,
  folderName: string
): Promise<string> {
  // 이름으로 폴더 검색
  const searchRes = await drive.files.list({
    q: `name='${folderName}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: "files(id, name)",
  });

  const existing = searchRes.data.files?.[0];
  if (existing?.id) return existing.id;

  // 없으면 생성
  const createRes = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    },
    fields: "id",
  });

  return createRes.data.id!;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const userId = formData.get("userId") as string | null;
    const quoteId = formData.get("quoteId") as string | null;

    if (!file || !userId || !quoteId) {
      return NextResponse.json({ error: "Missing file, userId, or quoteId." }, { status: 400 });
    }

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: `File type ${ext} is not supported.` }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 500 MB limit." }, { status: 400 });
    }

    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!rootFolderId) {
      return NextResponse.json({ error: "Drive folder not configured." }, { status: 500 });
    }

    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });

    // 1단계: userId 폴더
    const userFolderId = await getOrCreateFolder(drive, rootFolderId, userId);

    // 2단계: 주문 시간 폴더 (한국시간 기준)
    const quoteFolderId = await getOrCreateFolder(drive, userFolderId, quoteId);

    // 파일 업로드
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const driveResponse = await drive.files.create({
      supportsAllDrives: true,
      requestBody: {
        name: file.name,
        parents: [quoteFolderId], // ✅ 시간 폴더 안에 저장
        description: `userId:${userId} quoteId:${quoteId}`,
      },
      media: {
        mimeType: file.type || "application/octet-stream",
        body: stream,
      },
      fields: "id, name, size, webViewLink, webContentLink",
    });

    const driveFile = driveResponse.data;

    return NextResponse.json({
      fileId: driveFile.id,
      fileName: driveFile.name,
      fileSize: file.size,
      viewUrl: driveFile.webViewLink,
      downloadUrl: driveFile.webContentLink,
    });
  } catch (err) {
    console.error("Drive upload error:", err);
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const maxDuration = 60;