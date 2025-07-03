import FileUpload from "@/components/fileupload/FileUpload";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-full w-full bg-gray-100 dark:bg-gray-700">
      <FileUpload />
    </div>
  );
}
