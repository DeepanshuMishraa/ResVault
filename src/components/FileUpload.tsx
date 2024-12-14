import { BACKEND_URL } from "@/config";
import { useAuth } from "@/lib/AuthContext";
import axios from "axios";
import { useState } from "react";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const {user} = useAuth();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64WithType = {
          data: reader.result as string,
          fileType: file.type,
          fileName: file.name
        };
        resolve(JSON.stringify(base64WithType));
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file || !name || !category || !description) {
      setError("All fields are required");
      return;
    }

    try {
      setIsUploading(true);
      const base64File = await convertFileToBase64(file);

      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/upload`,
        {
          file: base64File,
          name,
          category,
          description,
          userId: user?.userId as string
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.resource) {
        setError(null);
        setFile(null);
        setName("");
        setCategory("");
        setDescription("");
      } else {
        setError(response.data.message || "Upload failed");
      }
    } catch (error) {
      setError("Failed to upload file");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">File</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full"
        />
      </div>

      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};
