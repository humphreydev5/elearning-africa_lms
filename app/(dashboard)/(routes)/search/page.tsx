import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";

// Define the interface for the search parameters
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

// Define the SearchPage component
const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  // Get the user ID from authentication
  const { userId } = auth();

  // If there is no user ID, redirect to the home page
  if (!userId) {
    return redirect("/");
  }

  // Fetch the categories from the database, ordered by name in ascending order
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  // Fetch the courses based on the user ID and search parameters
  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      {/* Render the search input on small screens */}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      {/* Render the categories and courses list */}
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}

// Export the SearchPage component as the default export
export default SearchPage;
