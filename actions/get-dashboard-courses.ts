// Import necessary types and functions from Prisma and local modules
import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

// Define a type that extends Course with additional properties for category, chapters, and progress
type CourseWithProgressWithCategory = Course & {
  category: Category; // Course category
  chapters: Chapter[]; // Array of chapters
  progress: number | null; // User's progress in the course, can be null
};

// Define the type for the function's return value
type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[]; // Array of completed courses
  coursesInProgress: CourseWithProgressWithCategory[]; // Array of courses in progress
}

// Function to get the dashboard courses for a specific user
export const getDashboardCourses = async (userId: string): 
Promise<DashboardCourses> => {
  try {
    // Fetch the courses purchased by the user
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true, // Include the course category
            chapters: {
              where: {
                isPublished: true, // Only include published chapters
              }
            }
          }
        }
      }
    });

    // Extract the course details from the purchased courses
    const courses = purchasedCourses.map((purchase) => purchase.course) as 
    CourseWithProgressWithCategory[];

    // Calculate the progress for each course and add it to the course data
    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    // Separate the courses into completed and in-progress categories
    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

    // Return the categorized courses
    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log("[GET_DASHBOARD_COURSES]", error);
    
    // Return default values in case of an error
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}
