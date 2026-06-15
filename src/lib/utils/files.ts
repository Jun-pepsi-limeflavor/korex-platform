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
    return "File size exceeds 500 MB limit.";
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
