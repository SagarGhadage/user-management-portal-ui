"use client";
import { generateOtp, verifyOTP } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

export default function page() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || localStorage.getItem('mailToVerify')||'');
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await verifyOTP(email, otp);
      console.log(response);
      enqueueSnackbar(response, { variant: "success" });
      router.push("/auth/login");
      localStorage.removeItem('mailToVerify')
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar("Error "+ error?.response?.data['message']||error?.message||" !", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async (email: any) => {
    try {
      if (email) {
        const res = await generateOtp(email);
        console.log(res);
        enqueueSnackbar(res, { variant: "info" });
      } else {
        enqueueSnackbar("Enter email ", { variant: "error" });
      }
    } catch (e: any) {
      enqueueSnackbar((e as any).response.data?.message || "Backend error", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (email.length > 3) {
      resendOtp(email);
    }
  }, []);

  return (
    <div className="h-full flex item-center justify-center bg-gray-100 dark:bg-gray-900 p-2">
      <form
        className="w-full m-2 max-w-sm p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 h-fit flex flex-col"
        onSubmit={handleVerify}
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          OTP Verification
        </h2>
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email:
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 ">
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Enter OTP:
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="otp"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button
          className={`w-full my-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
        >
          {isLoading ? "verifying" : "Verify OTP"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            resendOtp(email);
          }}
          className={`w-full my-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          Resend
        </button>
      </form>
    </div>
  );
}
