"use client";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
// import { useTheme } from "@/context/ThemeContext";
import { registerApi } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [registerForm, setRegisterForm] = useState({
    fname: "",
    lname: "",
    mobile:'',
    password: "",
    email: "",
    confirmPassword: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);
  // const { winSize } = useTheme();

  const handleRegForm = (e: { target: { name: any; value: any } }) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };
  interface RegisterFormData {
    fname: string;
    lname: string;
    email: string;
    mobile:number;
    password: string;
    confirmPassword: string;
    role: string;
    // Add other fields if needed
  }
  const registerUser = async (formData: RegisterFormData) => {
    if (validateInput(formData)) {
      setLoading(true);
      try {
        const newFormData = {
          firstName: formData.fname,
          lastName: formData.lname,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          mobile:formData.mobile
        };
        const data = await registerApi(newFormData);
        console.log(data);
        localStorage.setItem('mailToVerify',data?.email)
        router.push("/auth/verifyotp");
      } catch (err) {
        console.log(err);
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          typeof (err as any).response === "object" &&
          (err as any).response !== null &&
          "data" in (err as any).response
        ) {
          enqueueSnackbar(
            (err as any).response.data?.message || "Backend error",
            { variant: "error" }
          );
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const validateInput = (data: RegisterFormData) => {
    if (data?.fname === "") {
      enqueueSnackbar("First Name is a required field", { variant: "warning" });
      return false;
    }
    if (data?.lname === "") {
      enqueueSnackbar("Last Name is a required field", { variant: "warning" });
      return false;
    }
    if (data.email === "") {
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    }
    if (data.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <div
      className={`flex p-4 ${
        " "
        // winSize.width < 768 ? "items-start" : "items-center"
      } justify-center min-h-[88vh] bg-gray-100 dark:bg-gray-900 `}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 h-fit">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Register
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="fname"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Enter full name"
              value={registerForm.fname}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lname"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Enter full name"
              value={registerForm.lname}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={registerForm.email}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mob No.
            </label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              placeholder="Enter mobile"
              value={registerForm.mobile}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
              name="role"
              required
              className="px-2 py-2 rounded border text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={registerForm.role}
              onChange={handleRegForm}
            >
              <option value={""}>--Not Selected--</option>
              <option value={"Admin"}>Admin</option>
              <option value={"User"}>User</option>
              <option value={"Manager"}>Manager</option>
            </select>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              autoComplete="true"
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password with minimum 6 characters"
              value={registerForm.password}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              autoComplete="true"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerForm.confirmPassword}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              registerUser(registerForm);
            }}
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
