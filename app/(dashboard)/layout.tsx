// Import necessary components
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

// Define the DashboardLayout component
const DashboardLayout = ({
  children // Destructure the children prop
}: {
  children: React.ReactNode; // Define the type of the children prop
}) => {
  return ( 
    // Render the main layout structure
    <div className="h-full">
      {/* Render the Navbar component */}
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      {/* Render the Sidebar component for desktop view */}
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      {/* Render the main content area */}
      <main className="md:pl-56 pt-[80px] h-full">
        {/* Render the children components */}
        {children}
      </main>
    </div>
   );
}
 
// Export the DashboardLayout component as the default export of the module
export default DashboardLayout;
