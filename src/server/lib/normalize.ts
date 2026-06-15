import { Timestamp } from "firebase-admin/firestore";

export function normalizeDoc<T>(id: string, data: Record<string, unknown>): T {
  const normalized: Record<string, unknown> = { id };
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      normalized[key] = value.toDate();
    } else if (Array.isArray(value)) {
      normalized[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? normalizeNestedDoc(item as Record<string, unknown>)
          : item
      );
    } else {
      normalized[key] = value;
    }
  }
  return normalized as T;
}

function normalizeNestedDoc(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = value instanceof Timestamp ? value.toDate() : value;
  }
  return result;
}
