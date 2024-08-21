"use client"

import React from "react";
import Image from "next/image";
import Logo from "@/stuff/Red_Illustrated_Bull_Stock_Broker_Logo__1_-removebg-preview.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useMediaQuery } from "@mui/material";

const FooterItemsArray = [
  {
    id: "1",
    items: "Products",
    subitems: [
      "Why DailyQuill?",
      "Product Updates",
      "Security",
      "Status",
      "Email Marketing",
      "Transactional Email",
    ],
  },
  {
    id: "2",
    items: "Community",
    subitems: ["Agencies", "Freelancers", "Developers", "Events"],
  },
];

function FooterItems() {
  return (
    <div className="flex space-x-12 flex-row flex-wrap justify-evenly text-[15px]">
      {FooterItemsArray.map((item) => (
        <div key={item.id}>
          <h2 className="mb-2 text-md font-semibold text-gray-900 uppercase">
            {item.items}
          </h2>
          <ul className="text-gray-500 leading-7 font-medium">
            {item.subitems.map((subitem, index) => (
              <li key={index}>
                <a href="#" className="hover:underline">
                  {subitem}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


function Footer() {
  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 640px)");
  const TABLET_BREAK_POINT = useMediaQuery("(max-width: 1024px)");
  return (
    <div className="w-full flex flex-col px-4 tab:px-12 py-12 space-y-8">
      <div className="flex justify-between items-center flex-col tab:flex-row space-y-4 tab:space-y-0">
        <div className="flex flex-col items-center tab:items-start space-y-2 tab:space-y-4">
          <div className="flex items-center ">
            <Image src={Logo} className="w-16" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              DailyQuill
            </span>
          </div>
          <p className="text-[15px] w-[15rem] hidden tab:flex">
            with new challenges, featured solutions, selected articles and our
            latest news
          </p>
          <div className="flex space-x-4">
            <input
              placeholder="example@gmail.com"
              type="text"
              className="border-2 h-10 text-sm outline-none p-4 rounded-lg"
            />
            <button className="rounded-lg border-2 p-2 text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {
          !MOBILE_BREAK_POINT &&
          <div className="flex space-x-12 text-[15px]">
            {!TABLET_BREAK_POINT && <FooterItems />}
            <div className="w-[15rem] flex flex-col">
              <h2 className="mb-2 text-md font-semibold text-gray-900 uppercase">
                Contact Us
              </h2>
              <p className="text-gray-500 leading-7 font-medium">
                (555) 123-4567 support@DailyQuill.com 1234 Social Media Street Suite
                567 Cityville, Digitaland 54321 United States
              </p>
              <div className="flex mt-4">
                <FacebookIcon
                  style={{ fontSize: "25px" }}
                  className="hover:text-teal-700 cursor-pointer mr-2"
                />
                <TwitterIcon
                  style={{ fontSize: "25px" }}
                  className="hover:text-teal-700 cursor-pointer mx-2"
                />
                <LinkedInIcon
                  style={{ fontSize: "25px" }}
                  className="hover:text-teal-700 cursor-pointer mx-2"
                />
                <InstagramIcon
                  style={{ fontSize: "25px" }}
                  className="hover:text-teal-700 cursor-pointer mx-2"
                />
                <YouTubeIcon
                  style={{ fontSize: "25px" }}
                  className="hover:text-teal-700 cursor-pointer ml-2"
                />
              </div>
            </div>
          </div>}
      </div>

      <div className="flex items-center justify-center tab:justify-between text-gray-900 text-[15px]">
        <p>© 2023 DailyQuill Software, All rights reserved.</p>
        {
          !TABLET_BREAK_POINT &&
          <div className="flex space-x-4">
            <p className="hover:underline cursor-pointer">Privacy Policy</p>
            <p className="hover:underline cursor-pointer">Terms of Use</p>
            <p className="hover:underline cursor-pointer">Cookie Policy</p>
            <p className="hover:underline cursor-pointer">License</p>
          </div>}
      </div>


    </div>
  );
}

export default Footer;
