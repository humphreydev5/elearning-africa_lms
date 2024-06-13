// Import necessary libraries, components, and icons
import { auth } from "@clerk/nextjs/server"; // Clerk for authentication
import { redirect } from "next/navigation"; // Next.js for client-side navigation
import Link from "next/link"; // Next.js for internal linking
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react"; // Lucide icons

import { db } from "@/lib/db"; // Custom database module
import { IconBadge } from "@/components/icon-badge"; // Custom icon badge component
import { Banner } from "@/components/banner"; // Custom banner component

import { ChapterTitleForm } from "./_components/chapter-title-form"; // Custom form components
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions"; // Component for chapter actions

// Define the ChapterIdPage component
const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth(); // Retrieve the authenticated user's ID

  // Redirect to the homepage if the user is not authenticated
  if (!userId) {
    return redirect("/");
  }

  // Fetch the chapter details based on the provided chapter ID and course ID
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId
    },
    include: {
      muxData: true, // Include video data
    },
  });

  // Redirect to the homepage if the chapter does not exist
  if (!chapter) {
    return redirect("/")
  }

  // Determine the completion status of required fields
  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  // Render the UI elements
  return (
    <>
      {/* Render a banner if the chapter is unpublished */}
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      {/* Render the main content */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            {/* Render a link to navigate back to the course setup */}
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            {/* Render the title and completion status */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Chapter Creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              {/* Render chapter actions component */}
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        {/* Render forms for chapter customization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              {/* Render forms for chapter title and description */}
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your chapter
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              {/* Render forms for chapter access settings */}
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Access Settings
                </h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              {/* Render form for adding a video */}
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Add a video
              </h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
   );
}
 
// Export the ChapterIdPage component as the default export of the module
export default ChapterIdPage;
