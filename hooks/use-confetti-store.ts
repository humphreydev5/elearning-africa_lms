import { create } from "zustand";

/**
 * Type definition for the confetti store.
 */
type ConfettiStore = {
  isOpen: boolean;   // Indicates if the confetti is currently open.
  onOpen: () => void;   // Function to open the confetti.
  onClose: () => void;  // Function to close the confetti.
};

/**
 * Custom hook to manage the confetti state.
 */
export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
