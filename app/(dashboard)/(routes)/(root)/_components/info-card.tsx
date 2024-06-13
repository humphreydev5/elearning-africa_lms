// Import the LucideIcon type from lucide-react for type checking
import { LucideIcon } from "lucide-react";

// Import the IconBadge component for displaying icons with badges
import { IconBadge } from "@/components/icon-badge"

// Define the properties (props) that the InfoCard component will accept
interface InfoCardProps {
  numberOfItems: number; // The number of items to display
  variant?: "default" | "success"; // Optional variant for styling
  label: string; // The label to display
  icon: LucideIcon; // The icon to display
}

// Define the InfoCard component
export const InfoCard = ({
  variant,
  icon: Icon, // Destructure and rename the icon prop to Icon
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      {/* Render the IconBadge component with the specified variant and icon */}
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        {/* Display the label */}
        <p className="font-medium">
          {label}
        </p>
        {/* Display the number of items with proper singular/plural form */}
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  )
}
