"use client"

export default function InboxPage() {
    return (
        <>
            <div className="bg-white w-full flex space-x-4 ml-0 lap:ml-4 lg:flex p-1 h-full">
                <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-[25rem] p-3 tab:p-4 h-full">
                    <div className="w-full flex flex-row space-x-4">
                        <p className="font-semibold text-2xl">Inbox</p>
                    </div>
                </div>
                <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4">
                    <div className="w-full flex flex-row space-x-4">
                        abc
                    </div>
                </div>
            </div>
        </>
    )
}
