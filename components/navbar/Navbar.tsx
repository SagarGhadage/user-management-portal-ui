"use client";
import React, { useContext, useState } from "react";
import {
  LightMode,
  DarkMode,
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useThemes } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, useTheme } = useThemes();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex relative z-100 justify-between px-6 py-4 bg-gray-100 shadow dark:bg-gray-800">
      <Link
        href="/"
        className="text-2xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors duration-300 dark:hover:text-[#ffb600]"
      >
        USER MANAGEMENT PORTAL
      </Link>

      <div className="flex items-center gap-6">
        {user?.email && (
          <Link
            href={`/dashboard/${user?.role?.toLowerCase()}/users`}
            className="text-gray-800 hidden md:flex text-xl dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
          >
            Dashboard
          </Link>
        )}

        {!user?.email && (
          <div className="flex w-[auto] hidden md:flex md:flex-row gap-6">
            <Link
              href={"/auth/login"}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 hover:scale-105 hover:scale-110 dark:hover:text-[#ffb600]"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 hover:scale-110 dark:hover:text-[#ffb600]"
            >
              Register
            </Link>
          </div>
        )}
        {user?.email && (
          <button
            onClick={logout}
            className="px-3 py-1 hidden md:flex text-white bg-red-500 rounded-lg hover:bg-red-600 hover:scale-110"
          >
            Logout
          </button>
        )}

        {user?.email && (
          <Link
          href={`/dashboard/${user?.role?.toLowerCase()}`}  className="text-xl font-medium flex items-center gap-2 text-gray-800 dark:text-gray-100 
          hover:text-blue-500 "
          >
            <span className="hidden md:flex hover:scale-105 dark:hover:text-[#ffb600]">
              {user?.firstName + " " + user.lastName || "User ABC"}
            </span>
            {/* {user?.name || "User ABC"} */}
            <AccountCircle className="text-4xl hover:scale-110 hover:scale-110 dark:hover:text-[#ffb600]" />
          </Link>
        )}

        <button
          onClick={() => {
            useTheme();
          }}
          className="p-2 text-gray-800  hidden md:flex bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-119 hover:bg-[#ffb600]"
        >
          {theme === "light" ? (
            <DarkMode className="text-4xl hover:scale-121 hover:bg-[#ffb600]" />
          ) : (
            <LightMode className="text-6xl hover:scale-120 hover:text-[#ffb600]" />
          )}
        </button>
        {/* Manu  Icon */}
        <button
          className="block md:hidden p-2 text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-100 hover:bg-yellow-300 dark:hover:bg-gray-600 hover:scale-119 dark:hover:text-[#ffb600]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col absolute z-10 rounded-lg bg-[#f5f5f5b8]  shadow-xl p-6 top-20 right-5 dark:bg-[#1f2937b5] items-center justify-center md:hidden">
          {user?.email && (
            <div className="flex flex-col items-center gap-4">
              <Link
                href={"/"}
                className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:scale-110 dark:hover:text-[#ffb600]"
              >
                <AccountCircle className="text-3xl" />
                <span className="text-lg font-medium">{user.email}</span>
              </Link>

              <button
                onClick={logout}
                className="px-4 w-full py-2 text-white bg-red-500 rounded hover:bg-red-600 hover:scale-110"
              >
                Logout
              </button>
            </div>
          )}
          {!user?.email && (
            <div className="flex w-full flex-col items-center gap-4 ">
              <Link
                href={"/auth/login"}
                className="px-4 py-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600 hover:scale-110"
              >
                Login
              </Link>
              <Link
                href={"/auth/register"}
                className="px-4 py-2 w-full text-white bg-green-500 rounded hover:bg-green-600 hover:scale-110"
              >
                Register{" "}
              </Link>
            </div>
          )}
          <button
            className="p-2 mt-3 text-gray-800 w-full bg-gray-200 rounded-full dark:bg-gray-700 dark:text-yellow-100 hover:bg-gray-300 dark:hover:bg-gray-800 hover:scale-110 dark:hover:text-[#ffb600]"
            onClick={useTheme}
          >
            {theme === "light" ? (
              <DarkMode className="text-4xl hover:text-[#ffb600]" />
            ) : (
              <LightMode className="text-6xl hover:text-[#ffb600] " />
            )}{" "}
            Switch To {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      )}
    </nav>
  );
}
