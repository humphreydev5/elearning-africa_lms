// Import necessary types from Prisma client
import { Chapter, Course, UserProgress } from "@prisma/client"

// Import the NavbarRoutes component
import { NavbarRoutes } from "@/components/navbar-routes";

// Import the CourseMobileSidebar component
import { CourseMobileSidebar } from "./course-mobile-sidebar";

// Define the CourseNavbarProps interface to describe the props received by the CourseNavbar component
interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

// Define the CourseNavbar component
export const CourseNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {
  return (
    // Render the CourseNavbar component
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      {/* Render the CourseMobileSidebar component */}
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      {/* Render the NavbarRoutes component */}
      <NavbarRoutes />      
    </div>
  )
}
