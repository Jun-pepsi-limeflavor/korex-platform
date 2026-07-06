export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "";

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID) && process.env.NODE_ENV === "production";
}
