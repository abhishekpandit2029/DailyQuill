"use client"

import ProfileInfoForm from "@/components/Form/ProfileInfoForm";
import useMe from "@/hooks/useMe";
import { useUpdateMe } from "@/hooks/useUpdateMe";
import { Button, FormInstance, message } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Image } from "antd";
import { defaultProfileImage } from "@/constants/strings";
import { usePatchMutation } from "@/lib/fetcher";
import revalidate from "@/lib/revalidate";
import clsx from "clsx";

export default function ProfileDetailsPage() {
    const formRef = useRef<FormInstance>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { back } = useRouter();
    const { userData } = useMe()
    const { update, isMutating } = useUpdateMe()

    const { trigger: updateProfile, isMutating: ispdateProfile } = usePatchMutation("/users/userprofile", {
        onSuccess: () => {
            revalidate("/users/me");
        },
        onError: (error) => {
            message.error(error.message);
        },
    });

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
        updateProfile({ userprofile_image: base64, id: userData?.data?._id, });
    }

    const uploadImage = async (event: { target: { files: any; }; }) => {
        const files = event.target.files;
        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    };

    const onSubmit = () => {
        formRef.current?.validateFields().then((values) => {
            update({ ...values, id: userData?.data?._id });
        });
    };

    return (
        <div className="bg-white flex flex-col space-x-2 h-[calc(100vh-4rem)] p-[0.1rem] rounded-xl ring-1 ring-gray-200 ml-4 overflow-y-scroll scrollbar-hide overflow-x-auto">
            <div className="flex flex-col items-center">
                <div className="h-full flex flex-col p-4 space-y-6 w-full">
                    <p onClick={() => back()} className="flex space-x-4 items-center cursor-pointer"><IoIosArrowBack />Go back</p>
                    <p className='font-semibold text-xl'>Profile Information</p>
                    <div className='flex flex-col space-y-4'>
                        <div>
                            <input
                                onChange={uploadImage}
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                            <Image onClick={handleIconClick} src={userData?.data?.userprofile_image || defaultProfileImage} alt="profile-pic" className={clsx("max-w-[9rem] h-auto rounded-[100rem] ring-2 ring-indigo-400 cursor-pointer", ispdateProfile ? " animate-pulse" : " animate-none")} preview={false} referrerPolicy="no-referrer" loading="lazy" />
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
    );
}
