"use client"

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function DisplayPage() {
    const { back } = useRouter();
    return (
        <div className="flex flex-col items-center">
            <div className="w-[80%] flex flex-col space-y-3">
                <p onClick={() => back()} className="flex space-x-4 items-center cursor-pointer"><IoIosArrowBack /> Go back</p>
                <div className='flex flex-col space-y-4 items-center'>
                    <div className="rounded-2xl ring-1 ring-gray-200 lg:flex h-full bg-white flex flex-col space-y-4 place-content-center my-3 tab:my-1 ml-0 lap:ml-4 p-3 tab:p-4 w-full">
                        <p className='font-semibold text-xl'>Dark Mode</p>
                        <div className='flex flex-col space-y-2'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
