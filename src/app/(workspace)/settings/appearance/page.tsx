"use client"

import Link from "next/link";
import { CiLocationArrow1 } from "react-icons/ci";

export default function AccountPage() {
    return (
        <div className='flex flex-col space-y-4 items-center'>
            <div className=" rounded-2xl ring-1 ring-gray-200 lg:flex h-full bg-white flex flex-col space-y-4 place-content-center my-3 tab:my-1 ml-0 lap:ml-4 p-3 tab:p-4 w-[80%]">
                <p className='font-semibold text-xl'>Display</p>
                <div className='flex flex-col space-y-2'>
                    <Link href="/settings/appearance/display" passHref>
                        <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between hover:text-indigo-500">
                            <span>Dark Mode</span>
                            <span><CiLocationArrow1 /> </span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
