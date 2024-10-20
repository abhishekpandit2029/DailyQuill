import { usePatchMutation } from "@/lib/fetcher";
import revalidate from "@/lib/revalidate";
import { message } from "antd";

export function useUpdateMe() {
    const { trigger: update, isMutating } = usePatchMutation("/users/updateme", {
        onSuccess: () => {
            revalidate("/users/me");
            revalidate("/users/getUsers");
        },
        onError: (error) => {
            message.error(error.message);
        },
    });
    return {
        update,
        isMutating,
    };
}