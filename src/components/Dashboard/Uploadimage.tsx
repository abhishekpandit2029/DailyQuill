import React from "react";
import { useState } from "react";
import assets from "../assets/assets.gif";
import axios from "axios";
import { useUpdateMe } from "@/hooks/useUpdateMe";
import useMe from "@/hooks/useMe";

export default function UploadImage() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const { userData } = useMe()
    const { update, isMutating } = useUpdateMe()

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64: unknown) {
        update({ userprofile_image: base64, id: userData?.data?._id, });
    }

    const uploadImage = async (event: { target: { files: any; }; }) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    };

    function UploadInput() {
        return (
            <div className="flex items-center justify-center w-full">
                <input
                    onChange={uploadImage}
                    type="file"
                ></input>
            </div>
        );
    }

    return (
        <div>
            <UploadInput />
        </div>
    );
}