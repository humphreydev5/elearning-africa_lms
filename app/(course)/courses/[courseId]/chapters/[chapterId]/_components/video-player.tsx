// Import necessary modules and components
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

// Define the VideoPlayerProps interface to describe the props received by the VideoPlayer component
interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
};

// Define the VideoPlayer component
export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  // State to track if the video player is ready
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  // Function to handle the end of the video playback
  const onEnd = async () => {
    try {
      // If the chapter should be marked as completed on end
      if (completeOnEnd) {
        // Update the progress of the chapter in the database
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        // If there is no next chapter, trigger confetti animation
        if (!nextChapterId) {
          confetti.onOpen();
        }

        // Show success message and refresh the page
        toast.success("Progress updated");
        router.refresh();

        // If there is a next chapter, navigate to it
        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
      }
    } catch {
      // Show error message if something goes wrong
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="relative aspect-video">
      {/* Show loading spinner if the video is not ready and the chapter is not locked */}
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {/* Show locked message if the chapter is locked */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {/* Render the MuxPlayer component if the chapter is not locked and the video is ready */}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(
            !isReady && "hidden"
          )}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  )
}
