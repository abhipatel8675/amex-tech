import { Bot, Cloud, Globe, MessageSquareQuote, Palette, Rocket, Search, Smartphone, Workflow, type LucideIcon } from "lucide-react";

// Maps Service.iconName (src/data/services.ts) to its icon component.
export const serviceIcons: Record<string, LucideIcon> = {
  Bot,
  Cloud,
  Globe,
  MessageSquareQuote,
  Palette,
  Rocket,
  Search,
  Smartphone,
  Workflow,
};

export function serviceIcon(name: string): LucideIcon {
  return serviceIcons[name] ?? Globe;
}
