"use client";

import React, { useRef } from "react";
import { Button, FormInstance, message, Modal, Space } from "antd";
import AddToDairyForm from "../Form/AddToDairyForm";
import { buttonClassName } from "@/constants/strings";
import { usePostMutation } from "@/lib/fetcher";
import revalidate from "@/lib/revalidate";
import useMe from "@/hooks/useMe";

interface ICardModel {
    handleCancel: () => void;
    onSave: () => void
    onCancel: () => void
    isModalOpen: boolean;
}

export default function AddToDairyModel(props: ICardModel) {
    const formRef = useRef<FormInstance>(null);
    const { userData } = useMe()
    const { handleCancel, isModalOpen, onCancel, onSave } = props;

    const { trigger: create, isMutating } = usePostMutation("/thoughtcard/createcarddata", {
        onSuccess: () => {
            message.success("Content created successfully");
            revalidate("/thoughtcard/getcardsdata");
            onSave();
        },
        onError: (error) => {
            message.error(error.message);
        },
    });
    const onSubmit = () => {
        formRef.current?.validateFields().then((values) => {
            create({
                ...values, isSoftDelete: false, username: userData?.data?.username, full_name: userData?.data?.full_name,
                userprofileImage: userData?.data?.userprofile_image, userID: userData?.data?._id
            });
        });
    };

    return (
        <>
            <Modal
                width={"50%"}
                open={isModalOpen}
                onCancel={handleCancel}
                closable={false}
                footer={[
                    <Space key="button-space" className="p-4">
                        <Button
                            key="cancel-button"
                            size="large"
                            onClick={onCancel}
                            className={buttonClassName}
                        >
                            Cancel
                        </Button>
                        <Button
                            key="save-button"
                            size="large"
                            loading={isMutating && true}
                            onClick={onSubmit}
                            type="primary"
                            className={buttonClassName}
                        >
                            Save
                        </Button>
                    </Space>
                ]}
            >
                <div className="flex flex-col space-y-6">
                    <p className="whitespace-nowrap text-xl font-bold leading-6 text-gray-900">
                        Add Your Thought
                    </p>
                    <AddToDairyForm record={undefined} onSave={onSave} onCancel={onCancel} edit={false} formRef={formRef} />
                </div>
            </Modal>

        </>
    );
}
