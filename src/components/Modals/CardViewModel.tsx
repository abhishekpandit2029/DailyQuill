"use client";

import React from "react";
import { Modal } from "antd";
import { IThoughtCards } from "@/app/(workspace)/dashboard/profile/page";
import { Tabs } from 'antd';
import CommentsSection from "../Main/Profile/CommentsSection";
import LikesSection from "../Main/Profile/LikesSection";
import { IGetCardsData } from "@/app/(workspace)/dashboard/bin/page";
import { useGetQuery } from "@/lib/fetcher";
interface ICardModel {
    handleCancel: () => void;
    isModalOpen: boolean;
    initialData: IThoughtCards | undefined
}

const items = [
    {
        key: '1',
        label: 'Likes',
        children: <LikesSection />,
    },
    {
        key: '2',
        label: 'Comments',
        children: <CommentsSection />,
    },
];

export default function CardViewModel(props: ICardModel) {
    const { handleCancel, isModalOpen, initialData } = props;
    const { data } = useGetQuery<IGetCardsData>(`/thoughtcard/getcardsdata?blogID=${initialData?._id}`);
    return (
        <>
            <Modal width={"50%"} footer={null} open={isModalOpen} onCancel={handleCancel} title={<p className="font-bold text-lg">{initialData?.title}</p>}>
                <div
                    className="flex flex-col space-y-2 w-full mb-2"
                >
                    <div className="text-base">
                        <p>{initialData?.content}</p>
                    </div>
                    <div>
                        <p className="text-base text-gray-500">{initialData?.tags?.join(" ")}</p>
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    className="w-full"
                    tabBarStyle={{ width: "100%" }}
                    items={items}
                />
            </Modal>
        </>
    );
} 
