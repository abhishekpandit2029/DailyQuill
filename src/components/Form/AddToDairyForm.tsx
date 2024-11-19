import React from 'react';
import { Form, Input, FormInstance } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { IThoughtCards } from '@/app/(workspace)/dashboard/profile/page';

interface IAddToDairyFormProps {
    record: IThoughtCards | undefined
    onSave: () => void
    onCancel: () => void
    edit?: boolean
    form?: FormInstance;
    formRef?: React.Ref<FormInstance>;
}

export default function AddToDairyForm(props: IAddToDairyFormProps) {
    const { record, formRef } = props;
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            ref={formRef}
            requiredMark={false}
            size="large"
            layout="vertical"
            labelCol={{ className: "font-medium" }}
            initialValues={record}
        >
            <div className='flex flex-col -space-y-1'>
                <div>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please Enter Title' }]}
                    >
                        <Input
                            placeholder="Please Enter Title"
                            style={{ color: 'black', borderRadius: "0.5rem", padding: 12, }}
                        />
                    </Form.Item>
                </div>
                <div className='flex flex-col -space-y-1'>
                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: 'Please Enter content' }]}
                    >
                        <TextArea
                            placeholder="Please Enter content"
                            className='h-100 scrollbar-hide'
                            style={{ color: 'black', borderRadius: "0.5rem", padding: 12, }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="tags"
                    >
                        <Input
                            placeholder="Please Enter Tags"
                            style={{ color: 'black', borderRadius: "0.5rem", padding: 12, }}
                        />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
