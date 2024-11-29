"use client"

import React, { createContext, ReactElement, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { usePostMutation } from "@/lib/fetcher";
import { useCookies } from "react-cookie";
import { cookieOptions, getExpiryFromToken } from "@/lib/jwt";
import revalidate from "@/lib/revalidate";

interface ILoginRequest {
  email: string
  password: string
}

interface ILoginResponse {
  message: string
  error: string
  token: string
}

export const AuthContext = createContext({
  isLoggedIn: false,
  logOut: () => { },
  logIn: (_datas: ILoginRequest) => { },
});

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();
  const [{ token }, setCookie, removeCookie] = useCookies(["token"]);

  const { trigger } = usePostMutation<ILoginRequest, ILoginResponse>("/users/login", {
    onSuccess(data) {
      const accessToken = data.token;
      if (accessToken) {
        setCookie("token", accessToken, {
          ...cookieOptions,
          expires: getExpiryFromToken(accessToken),
        });
        message.success("Login successful");
        push("/dashboard/profile");
        revalidate("/users/me");
      }
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  const logIn = (userData: ILoginRequest) => {
    trigger(userData);
  };

  const isLoggedIn = Boolean(token);

  const logOut = () => {
    removeCookie("token", cookieOptions);
    push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};;

export const useAuth = () => {
  return useContext(AuthContext);
};
