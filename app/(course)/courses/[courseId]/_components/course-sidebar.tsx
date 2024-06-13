// Import necessary modules and components
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";

// Define the CourseSidebarProps interface to describe the props received by the CourseSidebar component
interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;
}

// Define the CourseSidebar component
export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  // Get the userId from the authenticated user using the auth() function from Clerk
  const { userId } = auth();

  // If userId is not available, redirect the user to the homepage
  if (!userId) {
    return redirect("/");
  }

  // Retrieve the purchase information for the current user and course from the database
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      }
    }
  });

  // Render the CourseSidebar component
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      {/* Render course title and progress if the user has made the purchase */}
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      {/* Render sidebar items for each chapter of the course */}
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}
