// Import necessary modules and components
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

// Define the CourseEnrollButtonProps interface to describe the props received by the CourseEnrollButton component
interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

// Define the CourseEnrollButton component
export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  // Initialize state variable using the useState hook
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle button click
  const onClick = async () => {
    try {
      // Set loading state to true
      setIsLoading(true);

      // Send a request to the server to initiate the checkout process for the course
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      // Redirect the user to the checkout page URL received from the server response
      window.location.assign(response.data.url);
    } catch {
      // Show error toast message if something goes wrong
      toast.error("Something went wrong");
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
  }

  // Render the button component
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      {/* Display button text with formatted price */}
      Enroll for {formatPrice(price)}
    </Button>
  )
}
