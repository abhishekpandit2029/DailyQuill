import React, { useEffect } from 'react';
import { Form, Input, FormInstance, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { pronouns } from '@/constants/options';
import { IUser } from '@/hooks/useMe';
import dayjs from 'dayjs'

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
        })
    }, [record])

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
            <div className='flex space-x-4'>
                <Form.Item
                    name="username"
                    label="Username"
                    className="w-full"
                >
                    <Input
                        disabled
                        style={{ backgroundColor: 'white', color: 'black' }}
                        placeholder="Please Enter Username"
                    />
                </Form.Item>
                <Form.Item
                    label="Full Name"
                    name="full_name"
                    className="w-full"
                >
                    <Input
                        placeholder="Please Enter Full Name"
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-4'>
                <Form.Item
                    name="additional_name"
                    label="Additional Name"
                    className="w-full"
                >
                    <Input
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
            <div className='flex space-x-4'>
                <Form.Item
                    label="Bio/Description"
                    name="bio"
                    className="w-full"
                >
                    <TextArea
                        className='scrollbar-hide'
                        placeholder="Please Enter Bio/Description"
                    />
                </Form.Item>
                <Form.Item
                    label="Website/Links"
                    name="link"
                    className="w-full"
                >
                    <Input
                        placeholder="Please Enter Website/Links"
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-4'>
                <Form.Item
                    label="Email Address"
                    name="email"
                    className="w-full"
                >
                    <Input
                        disabled
                        style={{ backgroundColor: 'white', color: 'black' }}
                        placeholder="Please Enter Email"
                    />
                </Form.Item>
                <Form.Item
                    name="location"
                    label="Location"
                    className="w-full"
                >
                    <Input
                        placeholder="Please Enter Location"
                    />
                </Form.Item>
            </div>
            <div className='flex space-x-4'>
                <Form.Item
                    label="Joined Date"
                    name="createdAt"
                    className="w-full"
                >
                    <Input
                        disabled
                        style={{ backgroundColor: 'white', color: 'black' }}
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
                        style={{ backgroundColor: 'white', color: 'black' }}
                        placeholder="Please Enter Last Update Date"
                    />
                </Form.Item>

            </div>
        </Form>
    );
}