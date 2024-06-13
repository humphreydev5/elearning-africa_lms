import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/**
 * Props interface for the CourseProgress component.
 */
interface CourseProgressProps {
  value: number; // Progress value
  variant?: "default" | "success"; // Progress bar variant
  size?: "default" | "sm"; // Progress text size
}

/**
 * Object mapping progress bar colors by variant.
 */
const colorByVariant = {
  default: "bg-sky-700", // Default variant color
  success: "bg-emerald-700", // Success variant color
};

/**
 * Object mapping progress text sizes by variant.
 */
const sizeByVariant = {
  default: "text-sm", // Default variant text size
  sm: "text-xs", // Small variant text size
};

/**
 * Component for rendering course progress.
 */
export const CourseProgress = ({
  value,
  variant = "default",
  size = "default",
}: CourseProgressProps) => {
  return (
    <div>
      <Progress
        className={cn(
          "h-2",
          colorByVariant[variant],
        )}
        value={value}
      />
      <p className={cn(
        "font-medium mt-2",
        sizeByVariant[size],
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}
