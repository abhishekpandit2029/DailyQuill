"use client";

import { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { BsStars } from "react-icons/bs";
import { CopyOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { buttonClassName } from "@/constants/strings";

const { TextArea } = Input;

export default function StreamPost() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (!prompt.trim()) return;

        setOutput("");
        setLoading(true);

        const res = await fetch("/api/stream/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        const reader = res.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
                if (!line.startsWith("data:")) continue;

                const data = line.replace("data:", "").trim();
                if (!data || data === "[DONE]") continue;

                try {
                    const json = JSON.parse(data);
                    const text = json?.choices?.[0]?.delta?.content;

                    if (text) {
                        setOutput((prev) => prev + text);
                    }
                } catch {
                    // ignore chunk
                }
            }
        }

        setLoading(false);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(output);
        message.success("Copied to clipboard");
    };

    return (
        <>
            <div
                className={clsx(
                    "cursor-pointer border-dashed border-2 border-gray-200 flex justify-center items-center rounded-xl p-3",

                )}
                onClick={() => setIsOpen(true)}
            >
                <BsStars />
            </div>
            <Modal
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false)
                    setOutput("")
                    setPrompt("")
                }}
                footer={null}
                title="Generate your posts with AI"
                width={700}
            >
                <div className="flex flex-col gap-4">
                    <TextArea
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what kind of post you want..."
                    />

                    <button
                        className={buttonClassName}
                        onClick={generate}
                        disabled={!prompt.trim()}
                    >
                        {loading ? "Generating" : "Generate"}
                    </button>

                    {output && prompt.length > 0 && (
                        <div className="relative border rounded-lg p-3 bg-gray-50">
                            <pre className="whitespace-pre-wrap text-sm">{output}</pre>
                            <Button
                                icon={<CopyOutlined />}
                                size="small"
                                className="absolute top-2 right-2"
                                onClick={copyToClipboard}
                            >
                                Copy
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
