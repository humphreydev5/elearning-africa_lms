// Import the database module from the lib directory
import { db } from "@/lib/db";
// Import the redirect function from the next/navigation module
import { redirect } from "next/navigation";

// Define the CourseIdPage component
const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  // Fetch the course data from the database using the courseId parameter
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      // Include chapters related to the course
      chapters: {
        // Filter only published chapters
        where: {
          isPublished: true,
        },
        // Order chapters by position in ascending order
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  // If the course does not exist, redirect to the homepage
  if (!course) {
    return redirect("/");
  }

  // Redirect to the first chapter of the course
  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}

// Export the CourseIdPage component as the default export of the module
export default CourseIdPage;
