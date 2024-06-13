import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";

/**
 * Type definition for a course with progress and category information.
 */
type CourseWithProgressWithCategory = Course & {
  category: Category | null; // Category associated with the course
  chapters: { id: string }[]; // Array of chapters in the course
  progress: number | null; // Progress of the user in the course
};

/**
 * Props interface for the CoursesList component.
 */
interface CoursesListProps {
  items: CourseWithProgressWithCategory[]; // Array of courses with progress and category information
}

/**
 * Component for rendering a list of courses.
 */
export const CoursesList = ({
  items
}: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
}
