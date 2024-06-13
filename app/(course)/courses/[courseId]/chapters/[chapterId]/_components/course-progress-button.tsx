// Import necessary modules and components
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

// Define the CourseProgressButtonProps interface to describe the props received by the CourseProgressButton component
interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
};

// Define the CourseProgressButton component
export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle button click
  const onClick = async () => {
    try {
      // Set loading state to true
      setIsLoading(true);

      // Update the progress of the chapter in the database
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      });

      // If the chapter is marked as completed and there is no next chapter, trigger confetti animation
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      // If the chapter is marked as completed and there is a next chapter, navigate to the next chapter
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      // Show success toast message and refresh the page
      toast.success("Progress updated");
      router.refresh();
    } catch {
      // Show error toast message if something goes wrong
      toast.error("Something went wrong");
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
  }

  // Determine the icon based on whether the chapter is completed or not
  const Icon = isCompleted ? XCircle : CheckCircle;

  // Render the button component
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {/* Display appropriate text based on whether the chapter is completed or not */}
      {isCompleted ? "Not completed" : "Mark as complete"}
      {/* Render the icon next to the button text */}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  )
}
