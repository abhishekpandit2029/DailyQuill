import React, { useState } from "react";
import { Drawer } from "antd";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DailyQuill from "@/stuff/Red_Illustrated_Bull_Stock_Broker_Logo__1_-removebg-preview.png";
import { Button } from "@mui/base/Button";
import useMe from "@/hooks/useMe";
import { useAuth } from "@/context/AuthProvider";

export default function SidebarMenu() {
  const { push } = useRouter();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const isHome = useSelectedLayoutSegment()?.includes("home");
  const { userData } = useMe()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  function handleLogout() {
    auth?.logOut
    onClose()
  }

  return (
    <>
      <MenuOpenIcon className="text-3xl mr-2" onClick={showDrawer} />
      <Drawer
        title={
          <div className="flex items-center ">
            <a href="/" className="flex space-x-1">
              <Image className="w-16" src={DailyQuill} alt="logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {(userData?.data?.username ?
                  (userData.data.username.charAt(0).toUpperCase() + userData.data.username.slice(1).toLowerCase() + "'s")
                  : "User")}{" "}
                <span className="self-center text-2xl font-semibold whitespace-nowrap">
                  DailyQuill
                </span>
              </span>
            </a>
          </div>
        }
        onClose={onClose}
        open={open}
        placement="left"
        width="auto"
      >
        <div className="flex flex-col space-y-4">
          <Link onClick={onClose} href={isHome ? "#ProductOverview" : "/home#ProductOverview"} passHref>
            <p className="text-base font-semibold leading-6 text-gray-900">
              Features
            </p>
          </Link>
          <Link onClick={onClose} href={isHome ? "#Endorsements" : "/home#Endorsements"} passHref>
            <p className="text-base font-semibold leading-6 text-gray-900">
              Endorsements
            </p>
          </Link>
          <Link onClick={onClose} href={isHome ? "#Pricing" : "/home#Pricing"} passHref>
            <p className="text-base font-semibold leading-6 text-gray-900">
              Pricing
            </p>
          </Link>
          <Link onClick={onClose} href={isHome ? "#Subscribe" : "/home#Subscribe"} passHref>
            <p className="text-base font-semibold leading-6 text-gray-900">
              Subscribe
            </p>
          </Link>
          <Link href={"/dashboard/profile"} passHref>
            <p className="text-base font-semibold leading-6 text-gray-900">
              Workspace
            </p>
          </Link>
          {!auth?.isLoggedIn ?
            <Link onClick={onClose} href="/login">
              <Button
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-base font-semibold text-white w-24"
              >
                Log in
              </Button>
            </Link> : <Button onClick={handleLogout}
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-base font-semibold text-white w-24"
            >
              Logout
            </Button>
          }
        </div>
      </Drawer>
    </>
  );
}
