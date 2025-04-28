import { Empty } from 'antd'
import React from 'react'

function CommentsSection() {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        className='flex flex-col justify-center items-center'
        imageStyle={{ height: 60 }}
        description={
          <p>
            No Comments yet ! But you can be the first one.
          </p>
        }
      >
      </Empty>
    </div>
  )
}

export default CommentsSection