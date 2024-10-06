"use client"

import { CiLocationArrow1 } from "react-icons/ci";

export default function AccountPage() {
    return (
        <div className='flex flex-col space-y-4 items-center'>
            <div className="rounded-2xl ring-1 ring-gray-200 lg:flex h-full bg-white flex flex-col space-y-4 place-content-center my-3 tab:my-1 ml-0 lap:ml-4 p-3 tab:p-4 w-[80%]">
                <p className='font-semibold text-xl'>Profile information</p>

                <div className='flex flex-col space-y-2'>
                    <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between">
                        <span>Profile Data</span>
                        <span><CiLocationArrow1 /> </span>
                    </p>
                    <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between">
                        <span>Personal Demographic Information</span>
                        <span><CiLocationArrow1 /> </span>
                    </p>
                </div>
            </div>

            <div className=" rounded-2xl ring-1 ring-gray-200 lg:flex h-full bg-white flex flex-col space-y-4 place-content-center my-3 tab:my-1 ml-0 lap:ml-4 p-3 tab:p-4 w-[80%]">
                <p className='font-semibold text-xl'>Display</p>
                <div className='flex flex-col space-y-2'>
                    <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between">
                        <span>Dark Mode</span>
                        <span><CiLocationArrow1 /> </span>
                    </p>
                </div>
            </div>

            <div className=" rounded-2xl ring-1 ring-gray-200 lg:flex h-full bg-white flex flex-col space-y-4 place-content-center my-3 tab:my-1 ml-0 lap:ml-4 p-3 tab:p-4 w-[80%]">
                <p className='font-semibold text-xl'>General preferences</p>
                <div className='flex flex-col space-y-2'>
                    <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between">
                        <span>Language</span>
                        <span><CiLocationArrow1 /> </span>
                    </p>
                    <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between">
                        <span>Content Language</span>
                        <span><CiLocationArrow1 /> </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
