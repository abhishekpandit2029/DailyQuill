import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function CardSkeleton() {
    return (
        <div className="ring-1 ring-inset ring-gray-300 p-4 rounded-2xl flex flex-col space-y-2 w-full tab:w-[14rem] h-fit">
            <Skeleton variant="rounded" height={40} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={20} />
            <div className="flex space-x-4 justify-end items-center">
                <Skeleton variant="rounded" height={30} width={100} />
            </div>
        </div>

    );
}