"use client"

import { Divider } from "antd";
import { HardDeleteAction, RestoreDeleteAction } from "@/components/Dashboard/CardActions";
import { truncateString } from "@/constants/format";
import { useGetQuery } from "@/lib/fetcher";
import Image from "next/image";
import NoData from "../../../../stuff/Nodata.svg"
import useMe from "@/hooks/useMe";

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

    return (
        <div className="bg-white flex flex-col space-y-4  my-3 tab:my-1 ml-0 lap:ml-4 lg:flex rounded-2xl ring-1 ring-gray-200">
            <div className="">
                {BinData?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        <Image src={NoData} className="w-[30rem]" alt="Logo" />
                        <p className="font-semibold text-lg text-center">No Data was deleted yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 tab:grid-cols-3 lap:grid-cols-4 desk:grid-cols-5 gap-3 tab:gap-4 p-3 tab:p-4">
                        {Array.isArray(data?.thoughtCards) &&
                            data?.thoughtCards?.filter((items: any) => items?.isSoftDelete === true).map((items, index) => (
                                <div key={index} className="ring-1 ring-inset ring-gray-300 p-4 rounded-2xl flex flex-col space-y-3 w-full tab:max-w-[18rem] h-fit">
                                    <div>
                                        <p className="font-bold text-lg">{items?.title}</p>
                                    </div>
                                    <div className="cursor-pointer">
                                        <p>{truncateString(items?.content, 100)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">{items?.tags?.join(" ")}</p>
                                    </div>
                                    <Divider />
                                    <div className="flex space-x-4 justify-end items-center">
                                        <RestoreDeleteAction record={items} />
                                        <HardDeleteAction record={items} />
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
