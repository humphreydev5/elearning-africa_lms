// Import necessary modules and components
import { auth } from "@clerk/nextjs/server" // For user authentication
import { redirect } from "next/navigation"; // For redirecting users
import { CheckCircle, Clock } from "lucide-react"; // Icons for the dashboard

import { getDashboardCourses } from "@/actions/get-dashboard-courses"; // Function to get courses data for the dashboard
import { CoursesList } from "@/components/courses-list"; // Component to list courses

import { InfoCard } from "./_components/info-card"; // Component to display information cards

// Dashboard component
export default async function Dashboard() {
  // Get the authenticated user ID
  const { userId } = auth();

  // If no user ID is found, redirect to the home page
  if (!userId) {
    return redirect("/");
  }

  // Fetch completed and in-progress courses for the user
  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  // Render the dashboard UI
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Information card for courses in progress */}
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        {/* Information card for completed courses */}
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      {/* List of all courses */}
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
