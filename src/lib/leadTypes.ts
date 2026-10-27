// Shared by server code and the dashboard UI; keep free of server imports.

export const LEAD_STATUSES = ["new", "contacted", "replied", "call", "quoted", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_SOURCES = ["contact_form", "contact_section", "app_checker", "newsletter", "manual", "outreach"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  source: LeadSource;
  status: LeadStatus;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  website: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  quote_amount: number | null;
  next_follow_up: string | null;
  notes: string | null;
  meta: Record<string, unknown>;
};
