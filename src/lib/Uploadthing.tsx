import { generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/api/src/uploadthing";

export const UploadButton = generateUploadButton<OurFileRouter>({ // Remove the v1 path segment
});
