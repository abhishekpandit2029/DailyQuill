

import React from 'react';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
    PinterestIcon,
    EmailIcon,
} from 'react-share'
import { Modal } from "antd";
import { IThoughtCards } from "@/app/(workspace)/dashboard/profile/page";

interface ICardModel {
    handleCancel: () => void;
    isModalOpen: boolean;
    initialData: IThoughtCards | undefined
}

export default function CardInfoShareModal(props: ICardModel) {
    const { handleCancel, isModalOpen, initialData } = props;
    const title = 'Check out this amazing post!';
    const hashtags = '#NextJS #ReactShare';
    return (
        <>
            <Modal width={"50%"} footer={null} open={isModalOpen} onCancel={handleCancel} title={<p className="font-bold text-lg">{initialData?.title}</p>}>
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                    <h1>{initialData?.title}</h1>
                    <p>{initialData?.content}</p>
                    <p>{initialData?.tags}</p>

                    <h3>Share this post:</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <FacebookShareButton url={"shareUrl"} title={title} hashtag={hashtags}>
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>

                        <FacebookMessengerShareButton url={"shareUrl"} appId="YOUR_APP_ID">
                            <FacebookMessengerIcon size={40} round />
                        </FacebookMessengerShareButton>

                        <TwitterShareButton
                            url={"shareUrl"}
                            title={title}
                            hashtags={hashtags.split('#').filter(Boolean)}
                        >
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>

                        <TelegramShareButton url={"shareUrl"} title={title}>
                            <TelegramIcon size={40} round />
                        </TelegramShareButton>

                        <WhatsappShareButton url={"shareUrl"} title={title}>
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>

                        <LinkedinShareButton url={"shareUrl"} title={title}>
                            <LinkedinIcon size={40} round />
                        </LinkedinShareButton>

                        <PinterestShareButton
                            url={"shareUrl"}
                            media="https://via.placeholder.com/300" // Replace with your image URL
                            description={title}
                        >
                            <PinterestIcon size={40} round />
                        </PinterestShareButton>

                        <EmailShareButton url={"shareUrl"} subject={title} body="Check this out:">
                            <EmailIcon size={40} round />
                        </EmailShareButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
