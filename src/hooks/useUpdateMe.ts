import { usePatchMutation } from "@/lib/fetcher";
import revalidate from "@/lib/revalidate";
import { message } from "antd";

export function useUpdateMe() {
    const { trigger: update, isMutating } = usePatchMutation("/users/updateme", {
        onSuccess: () => {
            message.success("Information updated successfully");
            revalidate("/users/me");
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