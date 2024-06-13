// Import the Menu icon from lucide-react for displaying a menu icon
import { Menu } from "lucide-react";

// Import components for creating a sheet (a type of drawer)
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

// Import the Sidebar component to be displayed in the sheet
import { Sidebar } from "./sidebar";

// Define the MobileSidebar component
export const MobileSidebar = () => {
  return (
    // Render the Sheet component, which provides a drawer-like UI
    <Sheet>
      {/* SheetTrigger is the element that triggers the opening of the sheet */}
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        {/* Display the Menu icon */}
        <Menu />
      </SheetTrigger>
      {/* SheetContent is the content of the sheet */}
      <SheetContent side="left" className="p-0 bg-white">
        {/* Render the Sidebar component inside the sheet */}
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
