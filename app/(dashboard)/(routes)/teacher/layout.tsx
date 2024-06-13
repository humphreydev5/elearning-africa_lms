// Import necessary functions and components
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Define the TeacherLayout component
const TeacherLayout = ({
  children // Destructure the children prop
}: {
  children: React.ReactNode; // Define the type of the children prop
}) => {
  // Get the userId using auth() from Clerk
  const { userId } = auth();

  // Check if the user is a teacher using the isTeacher function
  if (!isTeacher(userId)) {
    // If the user is not a teacher, redirect them to the homepage
    return redirect("/");
  }

  // If the user is a teacher, render the children components
  return <>{children}</>;
}
 
// Export the TeacherLayout component as the default export of the module
export default TeacherLayout;
