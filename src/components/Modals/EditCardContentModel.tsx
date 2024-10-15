import React, { useRef } from "react";
import { Button, FormInstance, message, Modal, Space } from "antd";
import AddToDairyForm from "../Form/AddToDairyForm";
import { IThoughtCards } from "@/app/dashboard/profile/page";
import { usePatchMutation } from "@/lib/fetcher";
import revalidate from "@/lib/revalidate";
import { buttonClassName } from "@/constants/strings";
import useMe from "@/hooks/useMe";

interface ICardModel {
    handleCancel: () => void;
    onSave: () => void;
    onCancel: () => void;
    isModalOpen: boolean;
    initialData: IThoughtCards | undefined;
}

export function useCardUpdateMutation(successMessage?: string) {
    const { trigger: update, isMutating } = usePatchMutation("/thoughtcard/updatecarddata", {
        onSuccess: () => {
            message.success(successMessage || "Content updated successfully");
            revalidate("/thoughtcard/getcardsdata");
        },
        onError: (error) => {
            message.error(error.message);
        },
    });
    return {
        update,
        isMutating,
    };
}

export default function EditCardContentModel(props: ICardModel) {
    const formRef = useRef<FormInstance>(null);
    const { handleCancel, isModalOpen, initialData, onCancel, onSave } = props;
    const { update, isMutating } = useCardUpdateMutation();
    const { userData } = useMe()

    const onSubmit = () => {
        formRef.current?.validateFields().then((values) => {
            update({ ...values, id: initialData?._id, username: userData?.data?.username });
        });
        onCancel();
    };

    return (
        <>
            <Modal
                width={"50%"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Space key="modal-footer" className="p-4">
                        <Button key="cancel-button" size="large" onClick={onCancel} className={buttonClassName}>
                            Cancel
                        </Button>
                        <Button
                            key="update-button"
                            size="large"
                            loading={isMutating}
                            onClick={onSubmit}
                            type="primary"
                            className={buttonClassName}
                        >
                            Update
                        </Button>
                    </Space>
                ]}
            >
                <div className="flex flex-col space-y-6">
                    <p className="whitespace-nowrap text-xl font-bold leading-6 text-gray-900">
                        Add Your Thought
                    </p>
                    <AddToDairyForm record={initialData} onSave={onSave} onCancel={onCancel} formRef={formRef} />
                </div>
            </Modal>
        </>
    );
}
