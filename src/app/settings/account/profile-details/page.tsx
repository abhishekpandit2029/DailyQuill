"use client"

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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { back } = useRouter();
    const { userData } = useMe()
    const { update, isMutating } = useUpdateMe()

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleIconClick = () => {
        fileInputRef?.current?.click();
    };

    function uploadSingleImage(base64: unknown) {
        update({ userprofile_image: base64, id: userData?.data?._id, });
    }

    const uploadImage = async (event: { target: { files: any; }; }) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    };

    const onSubmit = () => {
        formRef.current?.validateFields().then((values) => {
            update({ ...values, id: userData?.data?._id, userprofile_image: userData?.data?.userprofile_image });
        });
    };

    return (
        <div className="flex flex-col items-center">

            <div className="w-[80%] flex flex-col space-y-3">
                <p onClick={() => back()} className="flex space-x-4 items-center cursor-pointer"><IoIosArrowBack /> Go back</p>
                <div className='flex flex-col space-y-4 items-center'>
                    <div className="rounded-2xl ring-1 ring-gray-200 lg:flex h-full bg-white flex flex-col place-content-center my-3 tab:my-1 ml-0 lap:ml-4 p-3 tab:p-4 w-full space-y-8">
                        <p className='font-semibold text-xl'>Profile Information</p>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <input
                                    onChange={uploadImage}
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                />

                                <Image onClick={handleIconClick} src={userData?.data?.userprofile_image || defaultProfileImage} alt="profile-pic" className="max-w-[9rem] h-auto rounded-[100rem] ring-2 ring-indigo-400 cursor-pointer" preview={false} referrerPolicy="no-referrer" />
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
