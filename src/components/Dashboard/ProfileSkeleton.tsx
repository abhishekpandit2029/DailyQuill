import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function ProfileSkeleton() {
    return (
        <div className="w-full lap:w-4/5 flex flex-col space-y-4">
            <div className="flex space-x-8 items-center self-start">
                <div className="flex tab:space-x-12 space-y-4 tab:space-y-0 space-x-0 items-center flex-col tab:flex-row rounded-sm">
                    <Skeleton variant="circular" width={140} height={140} />
                </div>
                <div className="flex space-x-4">
                    <div className="flex flex-col items-center"><Skeleton variant="rounded" height={60} className='w-[5rem]' /></div>

                    <div className="flex flex-col items-center cursor-pointer"><Skeleton variant="rounded" height={60} className='w-[5rem]' /></div>

                    <div className="flex flex-col items-center cursor-pointer"><Skeleton variant="rounded" height={60} className='w-[5rem]' /></div>
                </div>
            </div>

            <div className='flex flex-col space-y-2 w-full'>
                <Skeleton variant="rounded" height={20} className='w-[10rem]' />
                <Skeleton variant="rounded" height={60} className='w-full' />
                <Skeleton variant="rounded" height={20} className='w-[20rem]' />
                <Skeleton variant="rounded" height={40} className='w-[15rem]' />
            </div>
        </div>
    );
}