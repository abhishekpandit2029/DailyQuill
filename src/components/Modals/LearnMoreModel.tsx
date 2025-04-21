"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { buttonClassName } from "@/constants/strings";

export default function LearnMoreModel() {
    const { push } = useRouter();
    const auth = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function handleStart() {
        return auth?.isLoggedIn ? push("/dashboard/profile") : push("/auth/login");
    }

    return (
        <>
            <p onClick={showModal} className="text-sm font-semibold leading-6 text-black cursor-pointer">
                Learn more <span aria-hidden="true">→</span>
            </p>
            <Modal footer={null} open={isModalOpen} onCancel={handleCancel} width={1000}>
                <div className="py-4 mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Discover the Benefits of Our Daily Diary</h2>
                    <p className="text-gray-700 mb-4 text-lg">
                        Welcome to Your Personal Space for Reflection and Growth!
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
                        <li><strong>Capture Your Daily Moments:</strong> Write about your day, your thoughts, and your feelings. Whether it&apos;s a brief note or a detailed entry, your diary is a safe space for all your experiences.</li>

                        <li><strong>Reflect and Learn:</strong>Looking back at your entries allows you to see how you&apos;ve grown over time. Reflect on your achievements, learn from your challenges, and gain insight into your personal journey.</li>

                        <li><strong>Stay Organized:</strong> Easily organize your entries by date, category, or tags. Quickly find past entries to revisit your favorite memories or gain perspective on past experiences.</li>

                        <li><strong>Customize Your Experience:</strong> Personalize your diary with different themes and fonts. Make it your own space that reflects your personality and style.</li>

                        <li><strong>Keep Your Thoughts Private:</strong>Your privacy is our priority. All your entries are securely stored, and you control who can see your diary. Keep it private or share select entries with friends or a trusted community.</li>

                        <li><strong>Get Inspired:</strong> Discover daily prompts and ideas to kickstart your writing. Explore our community&apos;s featured entries for inspiration and connection.</li>

                        <li><strong>Accessible Anywhere:</strong> Write from anywhere, anytime. Our platform is accessible on all devices, so you can journal on the go or from the comfort of your home.</li>
                    </ul>
                    <div className="mt-6 flex justify-end">
                        <button className={buttonClassName} onClick={handleStart}>Start Writing Today</button>
                    </div>
                </div>

            </Modal>
        </>
    );
}



