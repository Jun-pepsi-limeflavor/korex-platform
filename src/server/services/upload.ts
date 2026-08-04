import { Readable } from "stream";
import { google } from "googleapis";

const ALLOWED_EXTENSIONS = new Set([
  ".step", ".stp", ".iges", ".igs", ".stl", ".obj", ".3mf",
  ".dxf", ".dwg", ".pdf", ".zip", ".rar",
]);

const MAX_FILE_SIZE = 500 * 1024 * 1024;

/** Top-level Drive folder that separates contact uploads from quote uploads */
const CONTACTS_ROOT_FOLDER = "contacts";

function getDriveAuth() {
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
  const searchRes = await drive.files.list({
    q: `name='${folderName}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: "files(id, name)",
  });

  const existing = searchRes.data.files?.[0];
  if (existing?.id) return existing.id;

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

function sanitizeFolderSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._@+-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 120);
}

/**
 * Contact owner key for Drive folders — mirrors quote's `{uid}` level,
 * but keyed by required contact fields (email + name) instead of Firebase UID.
 * Example: `jane_doe__jane@acme.com`
 */
export function buildContactOwnerKey(
  firstName: string,
  lastName: string,
  email: string
): string {
  const name = sanitizeFolderSegment(`${firstName}_${lastName}`);
  const mail = sanitizeFolderSegment(email);
  return `${name}__${mail}`;
}

export interface UploadResult {
  fileId: string;
  fileName: string;
  fileSize: number;
  viewUrl: string | null | undefined;
  downloadUrl: string | null | undefined;
}

async function uploadFileToDrive(
  file: File,
  parentFolderId: string,
  description: string
): Promise<UploadResult> {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`File type ${ext} is not supported.`);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File exceeds 500 MB limit.");
  }

  const auth = getDriveAuth();
  const drive = google.drive({ version: "v3", auth });

  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  const driveResponse = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: file.name,
      parents: [parentFolderId],
      description,
    },
    media: {
      mimeType: file.type || "application/octet-stream",
      body: stream,
    },
    fields: "id, name, size, webViewLink, webContentLink",
  });

  const driveFile = driveResponse.data;

  return {
    fileId: driveFile.id!,
    fileName: driveFile.name!,
    fileSize: file.size,
    viewUrl: driveFile.webViewLink,
    downloadUrl: driveFile.webContentLink,
  };
}

/**
 * Quote path: `{GOOGLE_DRIVE_FOLDER_ID}/{userId}/{quoteId}/{file}`
 */
export async function uploadQuoteFileToDrive(
  file: File,
  userId: string,
  quoteId: string
): Promise<UploadResult> {
  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) {
    throw new Error("Drive folder not configured.");
  }

  const auth = getDriveAuth();
  const drive = google.drive({ version: "v3", auth });

  const userFolderId = await getOrCreateFolder(drive, rootFolderId, userId);
  const quoteFolderId = await getOrCreateFolder(drive, userFolderId, quoteId);

  return uploadFileToDrive(file, quoteFolderId, `userId:${userId} quoteId:${quoteId}`);
}

/**
 * Contact path (same Drive root, separate namespace):
 * `{GOOGLE_DRIVE_FOLDER_ID}/contacts/{firstName_lastName__email}/{contactId}/{file}`
 *
 * DB metadata uses the same QuoteFile shape as quotes/orders for consistency.
 */
export async function uploadContactFileToDrive(
  file: File,
  firstName: string,
  lastName: string,
  email: string,
  contactId: string
): Promise<UploadResult> {
  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) {
    throw new Error("Drive folder not configured.");
  }

  const auth = getDriveAuth();
  const drive = google.drive({ version: "v3", auth });

  const contactsRootId = await getOrCreateFolder(drive, rootFolderId, CONTACTS_ROOT_FOLDER);
  const ownerKey = buildContactOwnerKey(firstName, lastName, email);
  const ownerFolderId = await getOrCreateFolder(drive, contactsRootId, ownerKey);
  const inquiryFolderId = await getOrCreateFolder(drive, ownerFolderId, contactId);

  return uploadFileToDrive(
    file,
    inquiryFolderId,
    `contactId:${contactId} email:${email} name:${firstName} ${lastName}`
  );
}
