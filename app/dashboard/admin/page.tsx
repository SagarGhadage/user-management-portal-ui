"use client";
import User from "@/components/users/Users";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && user?.role!="Admin") {
      router.replace(`/dashboard/${user?.role?.toLowerCase()||""}`);
    }
    console.log(user)
  }, [user]);

  // console.log(user)
  if(!user){
    return <div className="w-full">
      Wait
    </div>
  }

  return <div className="h-full bg-gray-100 dark:bg-gray-700 p-1">
    <User />
  </div>;
}
