// Import the database instance from the specified module
import { db } from "@/lib/db";

// Import the Course and Purchase types from the Prisma client
import { Course, Purchase } from "@prisma/client";

// Define a type that combines the Purchase type with an embedded Course type
type PurchaseWithCourse = Purchase & {
  course: Course;
};

// Function to group purchases by course and calculate total earnings for each course
const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  // Initialize an empty object to hold the grouped earnings
  const grouped: { [courseTitle: string]: number } = {};
  
  // Iterate over each purchase
  purchases.forEach((purchase) => {
    // Get the title of the course associated with the purchase
    const courseTitle = purchase.course.title;
    
    // If the course title is not already in the grouped object, initialize it with 0
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    
    // Add the price of the course to the total earnings for that course
    grouped[courseTitle] += purchase.course.price!;
  });

  // Return the grouped earnings
  return grouped;
};

// Function to get analytics data for a specific user
export const getAnalytics = async (userId: string) => {
  try {
    // Fetch all purchases made by the user, including the associated course data
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true,
      }
    });

    // Group the purchases by course and calculate the total earnings for each course
    const groupedEarnings = groupByCourse(purchases);

    // Transform the grouped earnings into an array of objects for easier use
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    // Calculate the total revenue by summing the earnings of all courses
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);

    // Get the total number of purchases
    const totalSales = purchases.length;

    // Return the analytics data
    return {
      data,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log("[GET_ANALYTICS]", error);

    // Return default values in case of an error
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}
