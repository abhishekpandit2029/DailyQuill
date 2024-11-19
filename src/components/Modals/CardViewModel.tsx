"use client";

import React from "react";
import { Modal } from "antd";
import { IThoughtCards } from "@/app/(workspace)/dashboard/profile/page";

interface ICardModel {
    handleCancel: () => void;
    isModalOpen: boolean;
    initialData: IThoughtCards | undefined
}

export default function CardViewModel(props: ICardModel) {
    const { handleCancel, isModalOpen, initialData } = props;
    return (
        <>
            <Modal width={"50%"} footer={null} open={isModalOpen} onCancel={handleCancel} title={<p className="font-bold text-lg">{initialData?.title}</p>}>
                <div
                    className="flex flex-col space-y-2 w-full"
                >
                    <div className="text-base">
                        <p>{initialData?.content}</p>
                    </div>
                    <div>
                        <p className="text-base text-gray-500">{initialData?.tags?.join(" ")}</p>
                    </div>
                </div>
            </Modal>
        </>
    );
}
