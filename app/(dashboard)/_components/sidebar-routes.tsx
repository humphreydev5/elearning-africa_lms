// Indicate that this file is a client-side module
"use client";

// Import necessary modules and icons
import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

// Define guest routes
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

// Define teacher routes
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

// Define the SidebarRoutes component
export const SidebarRoutes = () => {
  // Get the current pathname from the navigation hook
  const pathname = usePathname();

  // Determine if the current page is a teacher page
  const isTeacherPage = pathname?.includes("/teacher");

  // Select routes based on the current page type
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    // Render the sidebar items
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
