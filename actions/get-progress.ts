// Import the database instance from the specified module
import { db } from "@/lib/db";

// Function to calculate the progress of a user in a specific course
export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    // Fetch all published chapters for the given course
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true, // Only select the IDs of the chapters
      },
    });

    // Extract the IDs of the published chapters
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    // Count the number of chapters that the user has completed
    // among the published chapters
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds, // Only consider the published chapters
        },
        isCompleted: true,
      },
    });

    // Calculate the progress percentage
    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    // Return the calculated progress percentage
    return progressPercentage;
  } catch (error) {
    // Log any errors that occur during the process
    console.log("[GET_PROGRESS]", error);

    // Return 0 in case of an error
    return 0;
  }
};
