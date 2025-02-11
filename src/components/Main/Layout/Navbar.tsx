"use client";

import React from "react";
import { Image } from "antd";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import SidebarMenu from "@/components/Drawers/SidebarMenu";
import { Button } from "@mui/base/Button";
import { buttonClassName, defaultProfileImage } from "@/constants/strings";
import useMe from "@/hooks/useMe";
import { useAuth } from "@/context/AuthProvider";
import { TbLogout } from "react-icons/tb";
import { useCookies } from "react-cookie";
export interface IMeResponse {
  data: {
    username: string
  }
}

function Navbar() {
  const auth = useAuth();
  const isHome = useSelectedLayoutSegment()?.includes("home");

  const { userData } = useMe()
  const [{ isSubscribed }] = useCookies(["isSubscribed"]);

  return (
    <nav
      className="flex items-center justify-between pt-4 pb-2 px-2 lg:px-8"
      aria-label="Global"
    >
      <div className="flex items-center ">
        <a href="/" className="flex space-x-1">
          <Image className="max-w-[5rem] h-auto" src={defaultProfileImage} alt="logo" preview={false} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            DailyQuill
          </span>
        </a>
      </div>
      <div className="flex lg:hidden">
        <SidebarMenu />
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-6">
        <Link href={isHome ? "#ProductOverview" : "/home#ProductOverview"} passHref>
          <p className="text-base font-semibold leading-6 text-gray-900">
            Features
          </p>
        </Link>
        <Link href={isHome ? "#Endorsements" : "/home#Endorsements"} passHref>
          <p className="text-base font-semibold leading-6 text-gray-900">
            Endorsements
          </p>
        </Link>
        <Link href={isHome ? "#Pricing" : "/home#Pricing"} passHref>
          <p className="text-base font-semibold leading-6 text-gray-900">
            Pricing
          </p>
        </Link>
        <Link href={isHome ? "#Subscribe" : "/home#Subscribe"} passHref>
          <p className="text-base font-semibold leading-6 text-gray-900">
            Subscribe
          </p>
        </Link>
        {isSubscribed ? <Link href={"/dashboard/profile"} passHref>
          <p className="text-base font-semibold leading-6 text-gray-900">
            Workspace
          </p>
        </Link> :
          <Link href={"/payment/checkout"} passHref>
            <p className="text-base font-semibold leading-6 text-gray-900">
              Unlock
            </p>
          </Link>}

        {auth?.isLoggedIn ?
          <div className="flex space-x-1 items-center cursor-pointer">
            <Image src={userData?.data?.userprofile_image || defaultProfileImage} alt="profile-pic" className="max-w-[2rem] h-auto rounded-[100rem] ring-2 ring-indigo-400 cursor-pointer mr-1" preview={false} referrerPolicy="no-referrer" />

            <p className="text-base normal-case font-semibold leading-6 text-gray-900">
              {(userData?.data?.username ?
                userData.data.username.charAt(0).toUpperCase() + userData.data.username.slice(1).toLowerCase()
                : "User")}
            </p>
            <p onClick={auth?.logOut} className="whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2">
              <span className="text-2xl ml-1"><TbLogout /> </span>
            </p>
          </div>
          :
          <Link href="/login">
            <Button
              className={buttonClassName}
            >
              Log in
            </Button>
          </Link>
        }
      </div>
    </nav >
  );
}

export default Navbar;