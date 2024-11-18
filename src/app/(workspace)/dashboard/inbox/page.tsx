"use client"

import ChatSearchUserSidebar from "@/components/Dashboard/ChatSearchUserSidebar"
import { useState } from "react"
import { MdOutlinePersonSearch } from "react-icons/md"

export default function InboxPage() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <div className="bg-white w-full flex space-x-4 ml-0 lap:ml-4 lg:flex p-1 h-full">
                <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-[25rem] p-3 tab:p-4 h-full">
                    <div className="w-full flex justify-between">
                        <p className="font-semibold text-2xl">Inbox</p>
                        <MdOutlinePersonSearch className="text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
                    </div>
                </div>
                <div
                    style={{ backgroundColor: '#FEFEFE' }}
                    className={`transition-all duration-700 ease-in-out ${open ? 'max-w-lg opacity-100' : 'max-w-0 opacity-0'
                        } w-[32rem]`}
                >
                    <ChatSearchUserSidebar />
                </div>

                <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4">
                    <div className="w-full flex flex-row space-x-4">
                        coming soon
                    </div>
                </div>
            </div>
        </>
    )
}
