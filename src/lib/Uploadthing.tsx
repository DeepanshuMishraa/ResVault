import { generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/api/src/uploadthing";

export const UploadButton = generateUploadButton<OurFileRouter>({
  url: `http://localhost:3000/api/uploadthing`, // Remove the v1 path segment
});
