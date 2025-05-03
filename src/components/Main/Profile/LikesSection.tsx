import { reactions } from '@/constants/options'
import { Empty, Segmented } from 'antd'
import React from 'react'

function LikesSection() {
    return (
        <div>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                className='flex flex-col justify-center items-center'
                imageStyle={{ height: 60 }}
                description={
                    <p>
                        No Likes yet ! But you can be the first one.
                    </p>
                }
            >
            </Empty>

            {/* <Segmented options={reactions.map((item) => item.emoji)} block defaultValue={reactions[0].emoji} /> */}
        </div>
    )
}

export default LikesSection
