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
                    className="ring-1 ring-inset ring-gray-300 p-4 rounded-2xl flex flex-col space-y-3 w-full"
                >
                    <div className="cursor-pointer">
                        <p>{initialData?.content}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">{initialData?.tags?.join(" ")}</p>
                    </div>
                </div>
            </Modal>
        </>
    );
}
