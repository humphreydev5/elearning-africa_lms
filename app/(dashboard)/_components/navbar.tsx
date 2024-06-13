// Import the NavbarRoutes component from the specified path
import { NavbarRoutes } from "@/components/navbar-routes"

// Import the MobileSidebar component from the current directory
import { MobileSidebar } from "./mobile-sidebar"

// Define the Navbar component
export const Navbar = () => {
  return (
    // Render a div with specific styling for the navbar
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      {/* Render the MobileSidebar component */}
      <MobileSidebar />
      {/* Render the NavbarRoutes component */}
      <NavbarRoutes />
    </div>
  )
}
