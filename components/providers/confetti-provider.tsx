import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";

/**
 * ConfettiProvider component responsible for rendering confetti effect.
 * It listens to the state changes in useConfettiStore to determine when to display confetti.
 */
export const ConfettiProvider = () => {
  // Access the confetti store hook
  const confetti = useConfettiStore();

  // Render null if confetti is not open
  if (!confetti.isOpen) return null;

  // Render ReactConfetti component with configurations
  return (
    <ReactConfetti
      className="pointer-events-none z-[100]" // CSS classes for styling
      numberOfPieces={500} // Number of confetti pieces
      recycle={false} // Disable recycling of confetti pieces
      onConfettiComplete={() => {
        // Callback function triggered when confetti animation completes
        // Close the confetti by calling onClose method from useConfettiStore
        confetti.onClose();
      }}
    />
  );
};