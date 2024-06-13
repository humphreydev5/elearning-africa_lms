// Import necessary libraries and components
import { auth } from "@clerk/nextjs/server"; // Clerk for authentication
import { redirect } from "next/navigation"; // Next.js for client-side navigation

import { db } from "@/lib/db"; // Custom database module

import { DataTable } from "./_components/data-table"; // Custom data table component
import { columns } from "./_components/columns"; // Columns configuration for the data table

// Define the CoursesPage component
const CoursesPage = async () => {
  const { userId } = auth(); // Retrieve the authenticated user's ID

  // Redirect to the homepage if the user is not authenticated
  if (!userId) {
    return redirect("/");
  }

  // Fetch the courses associated with the authenticated user
  const courses = await db.course.findMany({
    where: {
      userId, // Filter courses by user ID
    },
    orderBy: {
      createdAt: "desc", // Order courses by creation date in descending order
    },
  });

  // Render the UI elements
  return (
    <div className="p-6">
      {/* Render the data table with the fetched courses and specified columns */}
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

// Export the CoursesPage component as the default export of the module
export default CoursesPage;
