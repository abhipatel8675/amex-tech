import DevShell from "@/components/dashboard/DevShell";

// Each page still checks that the signed-in user is on the sales team.
export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return <DevShell variant="sales">{children}</DevShell>;
}
