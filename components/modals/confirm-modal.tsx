import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode; // Children elements triggering the modal
  onConfirm: () => void; // Function to execute on confirmation
};

// ConfirmModal component definition
export const ConfirmModal = ({
  children,
  onConfirm
}: ConfirmModalProps) => {
  return (
    <AlertDialog> {/* AlertDialog wrapper component */}
      {/* AlertDialogTrigger: This component acts as a trigger for the modal */}
      <AlertDialogTrigger asChild>
        {children} {/* Render the children elements that will trigger the modal */}
      </AlertDialogTrigger>
      <AlertDialogContent> {/* Content of the modal */}
        <AlertDialogHeader> {/* Header section of the modal */}
          <AlertDialogTitle>Are you sure?</AlertDialogTitle> {/* Title of the modal */}
          <AlertDialogDescription> {/* Description under the title */}
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter> {/* Footer section of the modal */}
          {/* AlertDialogCancel: Button to cancel the action */}
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* AlertDialogAction: Button to confirm the action */}
          <AlertDialogAction onClick={onConfirm}> {/* Execute the onConfirm function on click */}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
