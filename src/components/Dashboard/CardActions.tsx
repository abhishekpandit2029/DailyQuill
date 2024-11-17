import { MdOutlineAutoDelete } from "react-icons/md";
import React from 'react';
import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';
import { useCardUpdateMutation } from "../Modals/EditCardContentModel";
import { useDeleteMutation } from "@/lib/fetcher";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import revalidate from "@/lib/revalidate";
import useMe from "@/hooks/useMe";


export function SoftDeleteAction(record: any) {
    const { update } = useCardUpdateMutation("Content deleted successfully");
    const { userData } = useMe()

    const confirm: PopconfirmProps['onConfirm'] = async () => {
        update({
            id: record?.record?._id,
            isSoftDelete: true,
            username: userData?.data?.username
        })
    };

    return (
        <Popconfirm
            title="Delete The Content"
            description="Are you sure you want to delete this content?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
            arrow={false}
            placement="topRight"
        >
            <p className="flex items-center text-base"><MdOutlineAutoDelete className="cursor-pointer text-[1.2rem] hover:text-indigo-500 hover:scale-110 ease-in-out transition duration-200 mr-1" /> Delete</p>
        </Popconfirm>
    );
}

export function RestoreDeleteAction(record: any) {
    const { update } = useCardUpdateMutation("Content Restore successfully");
    const { userData } = useMe()

    const confirm: PopconfirmProps['onConfirm'] = async () => {
        update({
            id: record?.record?._id,
            isSoftDelete: false,
            username: userData?.data?.username
        })
    };

    return (
        <Popconfirm
            title="Restore The Content"
            description="Are you sure you want to Restore this content?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
            arrow={false}
            placement="topRight"
        >
            <MdOutlineRestore className="cursor-pointer text-[1.2rem] tab:text-[1.4rem] hover:text-indigo-500 hover:scale-110 ease-in-out transition duration-200" />
        </Popconfirm>
    );
}

export function HardDeleteAction(record: any) {
    const { userData } = useMe()
    const { trigger } = useDeleteMutation(
        "/thoughtcard/deletecarddata",
        {
            onSuccess() {
                message.success("Content deleted successfully");
                revalidate("/thoughtcard/getcardsdata");
            },
        }
    );

    const confirm: PopconfirmProps['onConfirm'] = async () => {
        trigger({
            id: record?.record?._id,
            username: userData?.data?.username
        })
    };

    return (
        <Popconfirm
            title="Delete The Content Permanently"
            description="Are you sure you want to delete this content Permanently?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
            arrow={false}
            placement="topRight"
        >
            <MdOutlineDelete className="cursor-pointer text-[1.2rem] tab:text-[1.4rem] hover:text-indigo-500 hover:scale-110 ease-in-out transition duration-200" />
        </Popconfirm>
    );
}
