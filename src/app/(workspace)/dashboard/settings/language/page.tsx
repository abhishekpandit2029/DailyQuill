"use client"

import { languages } from "@/constants/options";
import useMe from "@/hooks/useMe";
import { useUpdateMe } from "@/hooks/useUpdateMe";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function LanguagePage() {
    const { back } = useRouter();
    const { userData } = useMe()
    const { update, isMutating } = useUpdateMe()

    function handleChange(value: string) {
        update({ id: userData?.data?._id, language: value })
    }

    return (
        <div className="bg-white flex flex-col space-x-2 h-[calc(100vh-4rem)] p-[0.1rem] rounded-xl ring-1 ring-gray-200 ml-4">
            <div className="h-full bg-white flex flex-col space-y-4 p-4 w-full">
                <p onClick={() => back()} className="flex space-x-4 items-center cursor-pointer"><IoIosArrowBack /> Go back</p>
                <p className='font-semibold text-xl'>Language</p>
                <div className='flex flex-col space-y-4'>
                    <p className="text-sm">In which language you want to write content on DailyQuill?</p>
                    <Select
                        placeholder="Select a language"
                        style={{ width: 200 }}
                        onChange={handleChange}
                        value={userData?.data?.language}
                        options={languages}
                        disabled={isMutating}
                    />
                    <p className="text-sm">Let us know which language you’re most comfortable using on LinkedIn. You can change it back at any time.</p>
                </div>
            </div>
        </div>
    );
}
