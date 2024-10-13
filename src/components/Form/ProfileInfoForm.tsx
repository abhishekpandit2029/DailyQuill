import React, { useEffect } from 'react';
import { Form, Input, FormInstance, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { pronouns } from '@/constants/options';
import { IUser } from '@/hooks/useMe';
import dayjs from 'dayjs'
import ProfilePic from "@/stuff/pxfuel.jpg"
import Image from "next/image";

interface IAddToDairyFormProps {
    record: IUser | undefined
    form?: FormInstance;
    formRef?: React.Ref<FormInstance>;
}

export default function ProfileInfoForm(props: IAddToDairyFormProps) {
    const { record, formRef } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            username: record?.data?.username,
            full_name: record?.data?.full_name,
            additional_name: record?.data?.additional_name,
            pronounce: record?.data?.pronounce,
            bio: record?.data?.bio,
            email: record?.data?.email,
            createdAt: dayjs(record?.data?.createdAt)?.format('YYYY-MM-DD - HH:mm:ss'),
            updatedAt: dayjs(record?.data?.updatedAt)?.format('YYYY-MM-DD - HH:mm:ss'),
            link: record?.data?.link,
            location: record?.data?.location,
            link_alias: record?.data?.link_alias
        })
    }, [record, form])

    return (
        <Form
            form={form}
            ref={formRef}
            requiredMark={false}
            size="large"
            layout="vertical"
            labelCol={{ className: "font-medium" }}
            initialValues={record?.data}
        >

            <div className='flex space-x-8'>
                <Form.Item
                    name="profile_photo"
                    className="flex tab:space-x-12 space-y-4 tab:space-y-0 space-x-0 items-center justify-center flex-col tab:flex-row rounded-full ring-2 ring-indigo-400"
                >
                    <Image src={ProfilePic} alt="profile-pic" className="rounded-full max-w-[9rem]" />
                </Form.Item>
            </div>
            <div className='flex space-x-0 tab:space-x-8 tab:flex-row flex-col'>
                <Form.Item
                    name="username"
                    label="Username"
                    className="w-full"
                >
                    <Input
                        disabled
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Username"
                    />
                </Form.Item>
                <Form.Item
                    label="Full Name"
                    name="full_name"
                    className="w-full"
                >
                    <Input
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Full Name"
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-0 tab:space-x-8 tab:flex-row flex-col'>
                <Form.Item
                    name="additional_name"
                    label="Additional Name"
                    className="w-full"
                >
                    <Input
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Additional Name"
                    />
                </Form.Item>
                <Form.Item
                    name="pronounce"
                    label="Pronouns"
                    className="w-full"
                >
                    <Select
                        placeholder="Select a Pronouns"
                        value={record?.data?.pronounce}
                        options={pronouns}
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-8'>
                <Form.Item
                    label="Bio/Description"
                    name="bio"
                    className="w-full"
                >
                    <TextArea
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        className='scrollbar-hide'
                        placeholder="Please Enter Bio/Description"
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-0 tab:space-x-8 tab:flex-row flex-col'>
                <Form.Item
                    label="Website/Links"
                    name="link"
                    className="w-full"
                >
                    <Input
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Website/Links"
                    />
                </Form.Item>
                <Form.Item
                    label="Show Website/Links as"
                    name="link_alias"
                    className="w-full"
                >
                    <Input
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="eg. Portfolio, Website, Work"
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-0 tab:space-x-8 tab:flex-row flex-col'>
                <Form.Item
                    label="Email Address"
                    name="email"
                    className="w-full"
                >
                    <Input
                        disabled
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Email"
                    />
                </Form.Item>
                <Form.Item
                    name="location"
                    label="Location"
                    className="w-full"
                >
                    <Input
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Location"
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-0 tab:space-x-8 tab:flex-row flex-col'>
                <Form.Item
                    label="Joined Date"
                    name="createdAt"
                    className="w-full"
                >
                    <Input
                        disabled
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Joined Date"
                    />
                </Form.Item>
                <Form.Item
                    name="updatedAt"
                    label="Last Update Date"
                    className="w-full"
                >
                    <Input
                        disabled
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: "0.5rem" }}
                        placeholder="Please Enter Last Update Date"
                    />
                </Form.Item>

            </div>
        </Form>
    );
}
