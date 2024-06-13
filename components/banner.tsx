import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Variant definitions for the Banner component.
 */
const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

/**
 * Props interface for the Banner component.
 */
interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string; // Banner label text
};

/**
 * Component for rendering a banner with a label and an icon.
 */
export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  // Map of icons corresponding to different variants
  const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
  };

  // Determine the icon based on the variant, default to warning if not specified
  const Icon = iconMap[variant || "warning"];

  return  (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
