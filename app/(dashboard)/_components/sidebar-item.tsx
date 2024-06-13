// Indicate that this file is a client-side module
"use client";

// Import necessary modules and types
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Define the interface for the SidebarItem component's props
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

// Define the SidebarItem component
export const SidebarItem = ({
  icon: Icon, // Rename the 'icon' prop to 'Icon' for use within the component
  label,
  href,
}: SidebarItemProps) => {
  // Get the current pathname and router instance from Next.js navigation hooks
  const pathname = usePathname();
  const router = useRouter();

  // Determine if the current route is active
  const isActive =
    (pathname === "/" && href === "/") || // Check if the current path and href are both the root
    pathname === href || // Check if the current path matches the href
    pathname?.startsWith(`${href}/`); // Check if the current path starts with the href

  // Handle the click event to navigate to the specified href
  const onClick = () => {
    router.push(href);
  }

  return (
    // Render a button element with dynamic classes based on the active state
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}
