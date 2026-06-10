export type UserRole = "user" | "manager" | "admin";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  country: string;
  jobTitle?: string;
  assignedManagerId?: string;
  createdAt: Date;
  accountStatus: "active" | "suspended";
  role: UserRole;
  marketingOptIn: boolean;
}

export type ManufacturingProcess =
  | "cnc_machining"
  | "injection_molding"
  | "sheet_metal"
  | "die_casting"
  | "construction"
  | "electronics";

export type QuoteStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "quoted"
  | "accepted"
  | "expired"
  | "declined";

export interface QuoteFile {
  fileName: string;
  driveFileId: string;
  viewUrl: string;
  uploadedAt: Date;
  fileSize: number;
}

export interface QuoteConfiguration {
  partName: string;
  material: string;
  finish: string;
  toleranceClass: "standard" | "precision" | "custom";
  customTolerance?: string;
  quantity: number;
  targetDate: Date;
  notes?: string;
}

export interface QualityRequirements {
  fai: boolean;
  mtr: boolean;
  coc: boolean;
  ppap: boolean;
}

export interface QuotePricing {
  unitPrice: number;
  toolingCost: number;
  total: number;
  leadTimeDays: number;
  currency: "USD";
}

export interface Quote {
  id: string;
  userId: string;
  status: QuoteStatus;
  process: ManufacturingProcess;
  files: QuoteFile[];
  configurations: QuoteConfiguration[];
  qualityRequirements: QualityRequirements;
  submittedAt?: Date;
  managerId?: string;
  managerNotes?: string;
  pricing?: QuotePricing;
  quoteExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus =
  | "confirmed"
  | "material_sourced"
  | "in_production"
  | "qc_inspection"
  | "shipped"
  | "delivered";

export interface StatusHistoryEntry {
  status: OrderStatus;
  updatedAt: Date;
  updatedBy: string;
  note?: string;
}

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
}

export interface OrderDocument {
  type: "coc" | "fai" | "mtr" | "ppap" | "packing_list" | "shipping";
  fileName: string;
  driveFileId: string;
  viewUrl: string;
  uploadedAt: Date;
}

export interface Order {
  id: string;
  quoteId: string;
  userId: string;
  status: OrderStatus;
  statusHistory: StatusHistoryEntry[];
  promisedShipDate: Date;
  tracking?: TrackingInfo;
  documents: OrderDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  assignedUserIds: string[];
  specialties: ManufacturingProcess[];
}

export const SERVICE_SLUGS = {
  cnc_machining: "cnc-machining",
  injection_molding: "injection-molding",
  sheet_metal: "sheet-metal",
  die_casting: "die-casting",
  construction: "construction-components",
  electronics: "electronics-pcb",
} as const;

export const PROCESS_LABELS: Record<ManufacturingProcess, string> = {
  cnc_machining: "CNC Machining",
  injection_molding: "Injection Molding",
  sheet_metal: "Sheet Metal Fabrication",
  die_casting: "Die Casting",
  construction: "Modular Construction Components",
  electronics: "Electronics / PCB Assembly",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  confirmed: "Order Confirmed",
  material_sourced: "Material Sourced",
  in_production: "In Production",
  qc_inspection: "QC Inspection",
  shipped: "Shipped",
  delivered: "Delivered",
};

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under Review",
  quoted: "Quote Ready",
  accepted: "Accepted",
  expired: "Expired",
  declined: "Declined",
};
