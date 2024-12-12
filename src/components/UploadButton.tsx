import { OurFileRouter } from "@/api/src/uploadthing";
import { UploadButton } from "@uploadthing/react";


export const OurUploadButton = () => (
  <UploadButton<OurFileRouter, "imageUploader">
    endpoint="imageUploader"
    className="bg-blue-500 text-white px-4 py-2 rounded-md"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      alert("Upload Completed");
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    }}
    onBeforeUploadBegin={(files) => {
      // Preprocess files before uploading (e.g. rename them)
      return files.map(
        (f) => new File([f], "renamed-" + f.name, { type: f.type }),
      );
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
    }}
    onChange={(acceptedFiles) => {
      // Do something with the accepted files
      console.log("Accepted files: ", acceptedFiles);
    }}
  />
);
