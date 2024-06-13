import { generateComponents } from "@uploadthing/react";
 
import type { OurFileRouter } from "@/app/api/uploadthing/core";
 
// Generating upload components based on OurFileRouter
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
