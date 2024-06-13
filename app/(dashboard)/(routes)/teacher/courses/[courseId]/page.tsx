// Import necessary libraries, components, and icons
import { auth } from "@clerk/nextjs/server"; // Clerk for authentication
import { redirect } from "next/navigation"; // Next.js for client-side navigation
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react"; // Lucide icons

import { db } from "@/lib/db"; // Custom database module
import { IconBadge } from "@/components/icon-badge"; // Custom icon badge component
import { Banner } from "@/components/banner"; // Custom banner component

import { TitleForm } from "./_components/title-form"; // Custom form components
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions"; // Component for course actions

// Define the CourseIdPage component
const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const { userId } = auth(); // Retrieve the authenticated user's ID

  // Redirect to the homepage if the user is not authenticated
  if (!userId) {
    return redirect("/");
  }

  // Fetch the course details based on the provided course ID and the authenticated user's ID
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId // Filter courses by user ID
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc", // Order chapters by position in ascending order
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc", // Order attachments by creation date in descending order
        },
      },
    },
  });

  // Fetch all categories from the database
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc", // Order categories by name in ascending order
    },
  });

  // Redirect to the homepage if the course does not exist
  if (!course) {
    return redirect("/");
  }

  // Determine the completion status of required fields
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  // Render the UI elements
  return (
    <>
      {/* Render a banner if the course is unpublished */}
      {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      {/* Render the main content */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          {/* Render the title and completion status */}
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Course setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          {/* Render actions component */}
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        {/* Render forms for course customization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            {/* Render forms for title, description, image, and category */}
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your course
              </h2>
            </div>
            <TitleForm
              initialData={course}
              courseId={course.id}
            />
            <DescriptionForm
              initialData={course}
              courseId={course.id}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
            />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          {/* Render forms for course chapters, price, and attachments */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Course chapters
                </h2>
              </div>
              <ChaptersForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">
                  Sell your course
                </h2>
              </div>
              <PriceForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">
                  Resources & Attachments
                </h2>
              </div>
              <AttachmentForm
                initialData={course}
                courseId={course.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
// Export the CourseIdPage component as the default export of the module
export default CourseIdPage;
