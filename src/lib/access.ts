import { createClient } from "@/lib/supabase/server";

// Who may use which dashboard:
//   dev   = DEVELOPER_EMAIL (everything)
//   sales = SALES_EMAILS, comma-separated (Prospecting only; no leads, quotes, orders or payments)
//   client = anyone else who signs in
export type Role = "dev" | "sales" | "client";

export function roleFor(email: string | null | undefined): Role {
  const e = email?.trim().toLowerCase();
  if (!e) return "client";
  if (e === process.env.DEVELOPER_EMAIL?.trim().toLowerCase()) return "dev";
  const sales = (process.env.SALES_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return sales.includes(e) ? "sales" : "client";
}

export async function currentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user ? { email: user.email ?? "", role: roleFor(user.email) } : null;
}
