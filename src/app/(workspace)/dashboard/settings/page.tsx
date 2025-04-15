"use client"

import { Divider } from "antd";
import { HardDeleteAction, RestoreDeleteAction } from "@/components/Dashboard/CardActions";
import { truncateString } from "@/constants/format";
import { useGetQuery } from "@/lib/fetcher";
import Image from "next/image";
import NoData from "../../../../stuff/Nodata.svg"
import useMe from "@/hooks/useMe";
import { CiLocationArrow1 } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface IThoughtCards {
    title: string,
    content: string,
    tags: string[],
    username: string,
    full_name: string,
    userprofileImage: string,
    createdAt: string,
    updatedAt: string,
    userID: string
}

export interface IGetCardsData {
    thoughtCards: IThoughtCards[]
}

export default function BinPage() {
    const { userData } = useMe()
    const { data } = useGetQuery<IGetCardsData>(`/thoughtcard/getcardsdata?userID=${userData?.data?._id}`);
    const BinData = data?.thoughtCards?.filter((items: any) => items?.isSoftDelete === true) || [];
    const { push } = useRouter();

    return (
        <div className="bg-white flex flex-col space-x-2 h-[calc(100vh-4rem)] rounded-xl ring-1 ring-gray-200 ml-4 p-4">
            <div className='flex flex-col space-y-4 items-center'>
                <div className=" rounded-xl ring-1 ring-gray-200 h-full bg-white flex flex-col space-y-4 place-content-center p-4 w-full">
                    <p className='font-semibold text-xl'>Profile Overview</p>
                    <div className='flex flex-col space-y-2'>
                        <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between hover:text-indigo-500" onClick={() => push("/dashboard/settings/profile-details")}>
                            <span>Profile Information</span>
                            <span><CiLocationArrow1 /> </span>
                        </p>
                    </div>
                </div>

                <div className=" rounded-xl ring-1 ring-gray-200 h-full bg-white flex flex-col space-y-4 place-content-center p-4 w-full">
                    <p className='font-semibold text-xl'>General preferences</p>
                    <div className='flex flex-col space-y-2'>
                        <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between hover:text-indigo-500" onClick={() => push("/dashboard/settings/language")}>
                            <span>Language</span>
                            <span><CiLocationArrow1 /> </span>
                        </p>
                    </div>
                </div>

                {/* <div className=" rounded-xl ring-1 ring-gray-200 h-full bg-white flex flex-col space-y-4 place-content-center p-4 w-full">
                    <p className='font-semibold text-xl'>Display</p>
                    <div className='flex flex-col space-y-2'>
                        <Link href="/dashboard/settings/display" passHref>
                            <p className="text-base leading-6 text-gray-900 cursor-pointer items-center space-x-2 flex justify-between hover:text-indigo-500">
                                <span>Dark Mode</span>
                                <span><CiLocationArrow1 /> </span>
                            </p>
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
