// Import the database instance from the specified module
import { db } from "@/lib/db";

// Import the Attachment and Chapter types from the Prisma client
import { Attachment, Chapter } from "@prisma/client";

// Define the type for the function parameters
interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
};

// Function to get detailed information about a specific chapter for a user
export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    // Check if the user has purchased the course
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        }
      }
    });

    // Retrieve the course details, ensuring it is published
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      }
    });

    // Retrieve the chapter details, ensuring it is published
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      }
    });

    // If the chapter or course is not found, throw an error
    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    // Initialize variables for Mux data, attachments, and the next chapter
    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    // If the user has purchased the course, retrieve the attachments
    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId
        }
      });
    }

    // If the chapter is free or the user has purchased the course, retrieve Mux data and the next chapter
    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        }
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          }
        },
        orderBy: {
          position: "asc",
        }
      });
    }

    // Retrieve the user's progress for the chapter
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    });

    // Return the collected data
    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    // Log any errors that occur during the process
    console.log("[GET_CHAPTER]", error);
    
    // Return default values in case of an error
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    }
  }
}
