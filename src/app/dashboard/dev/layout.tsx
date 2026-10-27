import DevShell from "@/components/dashboard/DevShell";

// Each page still checks that the signed-in user is the developer.
export default function DevLayout({ children }: { children: React.ReactNode }) {
  return <DevShell>{children}</DevShell>;
}
