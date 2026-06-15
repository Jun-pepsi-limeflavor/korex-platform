import { auth } from "@/lib/firebase/config";
import type { Quote, Order, User, Manager } from "@/types";

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

function reviveDates<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (typeof value === "string" && ISO_DATE_RE.test(value)) {
    return new Date(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => reviveDates(item)) as T;
  }
  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      result[key] = reviveDates(val);
    }
    return result as T;
  }
  return value;
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated.");
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const authHeaders = await getAuthHeaders();
  const res = await fetch(path, {
    ...options,
    headers: {
      ...authHeaders,
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return res;
}

// ─── Quotes ──────────────────────────────────────────────────────────────────

export async function createQuote(data: Partial<Quote>): Promise<string> {
  const res = await apiFetch("/api/quotes", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const { id } = await res.json();
  return id;
}

export async function getUserQuotes(): Promise<Quote[]> {
  const res = await apiFetch("/api/quotes");
  return reviveDates(await res.json());
}

export async function getQuote(quoteId: string): Promise<Quote | null> {
  try {
    const res = await apiFetch(`/api/quotes/${quoteId}`);
    return reviveDates(await res.json());
  } catch {
    return null;
  }
}

export async function updateQuote(quoteId: string, data: Partial<Quote>): Promise<void> {
  await apiFetch(`/api/quotes/${quoteId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function submitQuote(quoteId: string): Promise<void> {
  await apiFetch(`/api/quotes/${quoteId}/submit`, { method: "POST" });
}

export async function acceptQuote(
  quoteId: string,
  promisedShipDate: Date
): Promise<string> {
  const res = await apiFetch(`/api/quotes/${quoteId}/accept`, {
    method: "POST",
    body: JSON.stringify({ promisedShipDate: promisedShipDate.toISOString() }),
  });
  const { orderId } = await res.json();
  return orderId;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function getUserOrders(): Promise<Order[]> {
  const res = await apiFetch("/api/orders");
  return reviveDates(await res.json());
}

export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const res = await apiFetch(`/api/orders/${orderId}`);
    return reviveDates(await res.json());
  } catch {
    return null;
  }
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUserProfile(): Promise<User | null> {
  try {
    const res = await apiFetch("/api/users/me");
    return reviveDates(await res.json());
  } catch {
    return null;
  }
}

export async function updateUser(data: Partial<User>): Promise<User> {
  const res = await apiFetch("/api/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return reviveDates(await res.json());
}

// ─── Managers ────────────────────────────────────────────────────────────────

export async function getManager(managerId: string): Promise<Manager | null> {
  try {
    const res = await apiFetch(`/api/managers/${managerId}`);
    return await res.json();
  } catch {
    return null;
  }
}

// ─── Upload ──────────────────────────────────────────────────────────────────

export async function uploadQuoteFile(
  quoteId: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ fileName: string; driveFileId: string; viewUrl: string; fileSize: number }> {
  onProgress?.(0);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("quoteId", quoteId);

  const res = await apiFetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json();

  onProgress?.(100);

  return {
    fileName: data.fileName,
    driveFileId: data.fileId,
    viewUrl: data.viewUrl,
    fileSize: data.fileSize,
  };
}
