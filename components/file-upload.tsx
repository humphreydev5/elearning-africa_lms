import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

/**
 * Props interface for the FileUpload component.
 */
interface FileUploadProps {
  onChange: (url?: string) => void; // Callback function triggered on file upload completion
  endpoint: keyof typeof ourFileRouter; // Endpoint for file upload
};

/**
 * Component for handling file uploads.
 */
export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url); // Pass the URL of the uploaded file to the onChange callback
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`); // Display an error toast if upload fails
      }}
    />
  );
};
