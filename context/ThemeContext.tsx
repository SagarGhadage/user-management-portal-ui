"use client";
import useWindowSize from "@/utils/useWindowSize";
import { SnackbarProvider } from "notistack";
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext({
  theme: "light",
  useTheme: () => {},
  winSize: { width: null, height: null },
});

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const winSize = useWindowSize();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Set theme from localStorage or system preference on client only
  // useEffect(() => {
  //   let initialTheme = "light";
  //   if (typeof window !== "undefined") {
  //     const stored = localStorage.getItem("theme");
  //     if (stored) {
  //       initialTheme = stored as "light" | "dark";
  //     } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //       initialTheme = "dark";
  //     }
  //   }
  //   if (initialTheme === "light" || initialTheme === "dark") {
  //     setTheme(initialTheme);
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const useTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, useTheme, winSize }}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {children}
      </SnackbarProvider>
    </ThemeContext.Provider>
  );
};

export const useThemes = () => useContext(ThemeContext);
