// Import necessary modules and components
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

// Define the CourseSidebarItemProps interface to describe the props received by the CourseSidebarItem component
interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

// Define the CourseSidebarItem component
export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  // Get the current pathname using the usePathname hook from Next.js
  const pathname = usePathname();
  // Get the router object using the useRouter hook from Next.js
  const router = useRouter();

  // Determine the icon to be displayed based on whether the chapter is locked or completed
  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  // Check if the current sidebar item is active (i.e., matches the current pathname)
  const isActive = pathname?.includes(id);

  // Function to handle click event on the sidebar item
  const onClick = () => {
    // Redirect the user to the corresponding chapter page when clicked
    router.push(`/courses/${courseId}/chapters/${id}`);
  }

  // Render the CourseSidebarItem component
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        // Apply conditional classes based on the state of the sidebar item
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      {/* Render the icon and label for the sidebar item */}
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            // Apply conditional classes based on the state of the sidebar item
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      {/* Render a border indicator for the active sidebar item */}
      <div className={cn(
        // Apply conditional classes based on the state of the sidebar item
        "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
        isActive && "opacity-100",
        isCompleted && "border-emerald-700"
      )} />
    </button>
  )
}
