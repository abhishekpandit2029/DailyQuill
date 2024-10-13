import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { FaSlack } from 'react-icons/fa6';

export default function ProfileSkeleton() {
    return (
        <div className="w-full lap:w-4/5 flex flex-row space-x-4 items-center">
            <div className="flex tab:space-x-12 space-y-4 tab:space-y-0 space-x-0 flex-col tab:flex-row">
                <Skeleton variant="circular" width={140} height={140} />
            </div>
            <div className='flex flex-col space-y-2 w-full'>
                <Skeleton variant="rounded" height={20} className='w-[10rem]' />
                <Skeleton variant="rounded" height={80} className='w-full' />
                <Skeleton variant="rounded" height={20} className='w-[20rem]' />
            </div>
        </div>
    );
}