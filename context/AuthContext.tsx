"use client";
import { loginApi, scheduleTokenRenewal } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
interface User {
  email: string;
  role: string;
  fullName: string;
}
type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
  login: (params: { email: string; password: string }) => Promise<void>;
  role?: string;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await loginApi({ email, password });
      // console.log(res);
      const { accessToken, refreshToken, user } = res;
      // console.log(user);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.push(`/dashboard/${user?.role?.toLowerCase()}/users`);
      scheduleTokenRenewal();
      enqueueSnackbar("Login successful!", { variant: "success" });
      return user;
    } catch (error) {
      console.log(error);
      if (error?.response && error?.response?.status == 409) {
        localStorage.setItem("mailToVerify", email);
        router.replace("/auth/verifyotp");
        enqueueSnackbar(
          "Login Failed! Not Verified " + error?.response?.data || " ",
          {
            variant: "error",
          }
        );
      } else {
        enqueueSnackbar("Login Failed!" + error?.massage, { variant: "error" });
      }
    }
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  const logout = () => {
    console.log("log out");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    
    const storedUser =
    storedUserStr != undefined || storedUserStr != null
    ? JSON.parse(storedUserStr)
    : null;
    if (storedUser) {
      setUser(storedUser);
      scheduleTokenRenewal();
    }
    
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     console.log(user, "user", setUser);
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
