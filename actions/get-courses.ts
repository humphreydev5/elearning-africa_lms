// Import necessary types and functions from Prisma and local modules
import { Category, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

// Define a type that extends Course with additional properties for category, chapters, and progress
type CourseWithProgressWithCategory = Course & {
  category: Category | null; // Course category, can be null
  chapters: { id: string }[]; // Array of chapters with only their IDs
  progress: number | null; // User's progress in the course, can be null
};

// Define the type for the function parameters
type GetCourses = {
  userId: string; // ID of the user requesting the courses
  title?: string; // Optional title filter for courses
  categoryId?: string; // Optional category ID filter for courses
};

// Function to get courses for a specific user with optional filters for title and category
export const getCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    // Fetch courses from the database that match the given filters and include related data
    const courses = await db.course.findMany({
      where: {
        isPublished: true, // Only include published courses
        title: {
          contains: title, // Filter courses by title if provided
        },
        categoryId, // Filter courses by category ID if provided
      },
      include: {
        category: true, // Include course category
        chapters: {
          where: {
            isPublished: true, // Only include published chapters
          },
          select: {
            id: true, // Only select chapter IDs
          }
        },
        purchases: {
          where: {
            userId, // Only include purchases made by the user
          }
        }
      },
      orderBy: {
        createdAt: "desc", // Order courses by creation date in descending order
      }
    });

    // Calculate the progress for each course and add it to the course data
    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async course => {
        // If the user has not purchased the course, set progress to null
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          }
        }

        // Calculate the progress percentage for the course
        const progressPercentage = await getProgress(userId, course.id);

        // Return the course data with the calculated progress
        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    // Return the courses with progress data
    return coursesWithProgress;
  } catch (error) {
    // Log any errors that occur during the process
    console.log("[GET_COURSES]", error);
    
    // Return an empty array in case of an error
    return [];
  }
}
