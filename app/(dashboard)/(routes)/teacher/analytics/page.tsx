import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

/**
 * Analytics page component.
 * Retrieves analytics data for the authenticated user and renders it.
 */
const AnalyticsPage = async () => {
  // Check if the user is authenticated
  const { userId } = auth();

  // Redirect to the homepage if the user is not authenticated
  if (!userId) {
    return redirect("/");
  }

  // Retrieve analytics data for the authenticated user
  const {
    data,
    totalRevenue,
    totalSales,
  } = await getAnalytics(userId);

  // Render the analytics data
  return ( 
    <div className="p-6">
      {/* Display total revenue and total sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
        />
      </div>
      {/* Render the chart component with analytics data */}
      <Chart
        data={data}
      />
    </div>
  );
}
 
export default AnalyticsPage;
