"use client";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { fileUpload } from "@/api/users";
const FileUpload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      enqueueSnackbar("Please select a file first.", { variant: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fileUpload(formData);
      console.log(response);
      enqueueSnackbar(
        "File uploaded successfully! name: " +
          response?.filename +
          " Size: " +
          response?.size,
        { variant: "success" }
      );
    } catch (error) {
      // console.error('Error uploading file:', error);
      enqueueSnackbar(
        "An error occurred while uploading the file." +
          error?.response?.data?.message ||
          error?.message ||
          "Network Error",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
      onSubmit={handleUpload}
    >
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Upload CSV or Excel File
      </h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 mb-4 cursor-pointer hover:border-gray-600 dark:hover:border-gray-500"
      >
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          {file ? "Select other" : "Chose file"}
        </label>
        {file ? (
          <span className="text-gray-600 dark:text-gray-300">
            Selected File: {file?.name}
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Drag and drop your file here or click to select [Excel or CSV]
          </span>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700"
      >
        Upload
      </button>
    </form>
  );
};

export default FileUpload;
