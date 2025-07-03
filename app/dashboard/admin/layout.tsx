import Link from "next/link";
import React from "react";

export default function layout({ children }: any) {
  return (
    <div className="w-full h-full px-4">
      <div className="flex flex-row  items-center justify-around my-4 gap-4 flex-wrap">
        <Link
          href={"/dashboard/admin/users"}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          View Users
        </Link>
        <Link
          href={"/dashboard/admin/create"}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          Add User
        </Link>

        <Link
          href={"/dashboard/admin/fileupload"}
          // className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        >
          File Upload
        </Link>
        <Link
          href={"/dashboard/admin/"}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 hover:scale-110 dark:hover:text-[#ffb600]"
        >
          Back
        </Link>
      </div>
      {children}
    </div>
  );
}
