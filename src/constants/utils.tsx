import { reactions } from "./options";

export function Reaction() {
    return (
        <div className="flex gap-2 bg-gray-50 rounded-md -m-2" >
            {
                reactions.map((reaction, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center justify-center p-1 rounded-md hover:bg-gray-200 transition duration-200"
                    >
                        <span className="text-lg">{reaction.emoji}</span>
                    </button>
                ))
            }
        </div>
    )
}
