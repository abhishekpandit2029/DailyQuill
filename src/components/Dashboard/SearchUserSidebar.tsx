import { useGetQuery } from '@/lib/fetcher';
import { Input } from 'antd'
import { Image } from 'antd';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { defaultProfileImage } from '@/constants/strings';

interface IUserData {
    _id: string,
    username: string,
    full_name: string,
    userprofile_image: string
}

interface IGetUserData {
    users: IUserData[]
}

export default function SearchUserSidebar() {
    const [searchItems, setSearchItems] = useState<string>("")
    const { push } = useRouter()
    const { data } = useGetQuery<IGetUserData>(`/users/getUsers?searchQuery=${searchItems}`);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItems(e.target.value);
    };

    function handleClick(values: IUserData) {
        push(`/dashboard/feed/${values?.username}?id=${values?._id}`)
    }

    return (
        <div className="w-full flex-col space-y-4 flex h-full p-[0.1rem]">
            <div className="rounded-xl ring-1 ring-gray-200 lg:flex w-full p-1">
                <div className="w-full flex flex-row space-x-4 items-center">
                    <Input
                        variant="borderless"
                        placeholder="Search people"
                        onChange={onSearch}
                        style={{ color: 'black', borderRadius: "0.7rem", padding: 10, fontSize: 17, border: "none" }}
                    />
                </div>
            </div>

            <div className="h-full flex-col space-y-4 flex overflow-y-scroll scrollbar-hide overflow-x-auto p-[0.1rem] rounded-xl ring-1 ring-gray-200 lg:flex">
                <div className='flex flex-col space-y-3 w-full p-4'>
                        {
                            data?.users?.map((item) => {
                                return (
                                    <div
                                        key={item?._id}
                                        className="flex items-center bg-white p-3 rounded-xl justify-between"
                                        style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
                                    >
                                        <div className='flex space-x-3 items-center cursor-pointer' onClick={() => handleClick(item)}>
                                            <Image src={item?.userprofile_image || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                                            <div>
                                                <p className='text-[0.9rem]'>{item?.username}</p>
                                                <p className='text-[0.8rem]'>{item?.full_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
        </div>
    )
}