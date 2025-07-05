"use client"

import React, { createContext, ReactElement, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useGetQuery, usePostMutation } from "@/lib/fetcher";
import { useCookies } from "react-cookie";
import { cookieOptions, getExpiryFromToken } from "@/lib/jwt";
import revalidate from "@/lib/revalidate";
import { useAuthStore } from "@/stores/signupStore";

interface ILoginRequest {
  email: string
  password: string
}

interface ILoginResponse {
  message: string
  error: string
  token: string
  userId: string
}

export const AuthContext = createContext({
  isLoggedIn: false,
  logOut: () => { },
  logIn: (_datas: ILoginRequest) => { },
  authIsMutating: false
});

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();
  const [{ token, userId }, setCookie, removeCookie] = useCookies(["token", "userId", "isSubscribed"]);
  const { reset } = useAuthStore();
  const { data: subscriptionData } = useGetQuery<{ subscription: { isSubscribed: Boolean } }>(userId ? `/users/subscription/${userId}` : null);

  const { trigger, isMutating } = usePostMutation<ILoginRequest, ILoginResponse>("/users/login", {
    onSuccess(data) {
      const accessToken = data.token;
      if (accessToken) {
        setCookie("token", accessToken, {
          ...cookieOptions,
          expires: getExpiryFromToken(accessToken),
        });
        setCookie("userId", data?.userId, {
          ...cookieOptions,
          expires: getExpiryFromToken(accessToken),
        });
        setCookie("isSubscribed", subscriptionData?.subscription?.isSubscribed, {
          ...cookieOptions,
          expires: getExpiryFromToken(accessToken),
        });

        message.success("Login successful");
        revalidate("/users/me");

        if (subscriptionData?.subscription?.isSubscribed) {
          push("/dashboard/profile");
        } else {
          push("/auth/home");
        }
        reset()
      }
    },
    onError: () => {
      message.error("Password is invalid");
    },
  });

  const logIn = (userData: ILoginRequest) => {
    trigger(userData);
  };

  const isLoggedIn = Boolean(token);

  const logOut = () => {
    removeCookie("token", cookieOptions);
    removeCookie("userId", cookieOptions);
    removeCookie("isSubscribed", cookieOptions);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, authIsMutating: isMutating }}>
      {children}
    </AuthContext.Provider>
  );
};;

export const useAuth = () => {
  return useContext(AuthContext);
};
