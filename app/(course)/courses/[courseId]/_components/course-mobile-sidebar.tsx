// Import necessary components and icons
import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

// Import UI components for sheet
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

// Import the CourseSidebar component
import { CourseSidebar } from "./course-sidebar";

// Define the CourseMobileSidebarProps interface to describe the props received by the CourseMobileSidebar component
interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

// Define the CourseMobileSidebar component
export const CourseMobileSidebar = ({ 
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    // Render the Sheet component for mobile sidebar
    <Sheet>
      {/* Render the trigger for the mobile sidebar */}
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      {/* Render the content of the mobile sidebar */}
      <SheetContent side="left" className="p-0 bg-white w-72">
        {/* Render the CourseSidebar component inside the mobile sidebar */}
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}
