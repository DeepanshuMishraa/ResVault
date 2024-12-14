import { BACKEND_URL } from "@/config";
import { useAuth } from "@/lib/AuthContext";
import axios from "axios";
import { useState } from "react";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [name,setName] = useState<string>("");
  const [category,setCategory] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  const {user} = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/upload`,
        {
          file: file,
          name: name,
          category: category,
          description: description,
          userId: user?.userId as string,
        },
        {
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      setError("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
      <input type="text" placeholder="Category" onChange={(e)=>setCategory(e.target.value)}/>
      <input type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)}/>
      <button onClick={handleUpload}>Upload</button>
      {isUploading && <p>Uploading: {uploadProgress}%</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
