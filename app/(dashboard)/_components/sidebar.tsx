import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

// Define Sidebar component
export const Sidebar = () => {
  return (
    // Render the sidebar container
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      {/* Render the logo */}
      <div className="p-6">
        <Logo />
      </div>
      {/* Render the sidebar routes */}
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
