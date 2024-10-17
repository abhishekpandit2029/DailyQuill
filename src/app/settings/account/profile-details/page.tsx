/* eslint-disable @next/next/no-img-element */
"use client"

import UploadImage from "@/components/Dashboard/Uploadimage";
import ProfileInfoForm from "@/components/Form/ProfileInfoForm";
import useMe from "@/hooks/useMe";
import { useUpdateMe } from "@/hooks/useUpdateMe";
import { Button, FormInstance } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Image } from "antd";
import { TbEdit } from "react-icons/tb";
import { defaultProfileImage } from "@/constants/strings";

export default function ProfileDetailsPage() {
    const formRef = useRef<FormInstance>(null);
    const { back } = useRouter();
    const { userData } = useMe()
    const { update, isMutating } = useUpdateMe()

    const onSubmit = () => {
        formRef.current?.validateFields().then((values) => {
            console.log("values", values)
            update({ ...values, id: userData?.data?._id, });
        });
    };

    return (
        <div className="flex flex-col items-center">
            <UploadImage />
            <div className="w-[80%] flex flex-col space-y-3">
                <p onClick={() => back()} className="flex space-x-4 items-center cursor-pointer"><IoIosArrowBack /> Go back</p>
                <div className='flex flex-col space-y-4 items-center'>
                    <div className="rounded-2xl ring-1 ring-gray-200 lg:flex h-full bg-white flex flex-col place-content-center my-3 tab:my-1 ml-0 lap:ml-4 p-3 tab:p-4 w-full">
                        <p className='font-semibold text-xl'>Profile Information</p>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <div className="relative top-8 left-32 rounded-full ring-2 ring-indigo-400 w-[1.8rem] h-[1.8rem] flex justify-center items-center">
                                    <TbEdit className="text-xl font-bold text-center cursor-pointer" />
                                </div>

                                <Image src={userData?.data?.userprofile_image || defaultProfileImage} alt="profile-pic" className="max-w-[9rem] max-h-[9rem] rounded-full ring-2 ring-indigo-400" preview={false} referrerPolicy="no-referrer" />
                            </div>

                            <ProfileInfoForm formRef={formRef} record={userData} />
                            <Button
                                key="save-button"
                                size="large"
                                loading={isMutating && true}
                                onClick={onSubmit}
                                className="!rounded-md !bg-indigo-500 w-full lap:w-[8rem] !text-white !hover:bg-indigo-500 outline-none"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
