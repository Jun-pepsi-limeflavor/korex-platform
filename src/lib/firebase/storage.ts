import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

const ALLOWED_EXTENSIONS = [
  "step", "stp", "iges", "igs", "dxf", "dwg", "stl",
  "obj", "3mf", "pdf", "zip", "rar",
];

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

export function validateFile(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return `File type .${ext} is not allowed. Accepted: ${ALLOWED_EXTENSIONS.join(", ")}`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File size exceeds 500 MB limit.`;
  }
  return null;
}

export function uploadQuoteFile(
  userId: string,
  quoteId: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ fileName: string; storageUrl: string; fileSize: number }> {
  return new Promise((resolve, reject) => {
    const path = `user-uploads/${userId}/${quoteId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(Math.round(percent));
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ fileName: file.name, storageUrl: url, fileSize: file.size });
      }
    );
  });
}

export async function deleteQuoteFile(storageUrl: string): Promise<void> {
  const fileRef = ref(storage, storageUrl);
  await deleteObject(fileRef);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
