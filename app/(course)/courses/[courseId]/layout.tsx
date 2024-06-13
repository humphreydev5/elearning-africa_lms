// Import necessary modules and components
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

// Define the CourseLayout component
const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  // Get the userId from the authenticated user using Clerk's auth() function
  const { userId } = auth();

  // If the user is not authenticated, redirect them to the homepage
  if (!userId) {
    return redirect("/");
  }

  // Fetch the course data from the database based on the courseId parameter
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  // If the course does not exist, redirect the user to the homepage
  if (!course) {
    return redirect("/");
  }

  // Calculate the user's progress count for the current course
  const progressCount = await getProgress(userId, course.id);

  // Render the CourseLayout component
  return (
    <div className="h-full">
      {/* Course Navbar */}
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      {/* Course Sidebar */}
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      {/* Main Content */}
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

// Export the CourseLayout component as the default export
export default CourseLayout;
