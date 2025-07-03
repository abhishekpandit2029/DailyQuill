import {
    usePathname,
    useSearchParams as useNextSearchParams,
    useRouter,
} from "next/navigation";
import { useCallback } from "react";

export type SearchParams =
    | "id"
    | "token"
    | "cid"
    | "email"
    | "name"

export type IUpdateSearchParams = Partial<
    Record<SearchParams, string | number | null>
>;

export default function useParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useNextSearchParams();

    const updateSearchParams = useCallback(
        (params: IUpdateSearchParams) => {
            const _searchParams = new URLSearchParams(window.location.search);
            const urlSearchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value != null) urlSearchParams.append(key, String(value));
            });

            _searchParams.forEach((value, key) => {
                if (!Object.keys(params).includes(key)) {
                    urlSearchParams.append(key, value);
                }
            });

            urlSearchParams.sort();
            router.push(`${pathname}?${urlSearchParams}`, { scroll: false });
        },
        [pathname, router]
    );

    function get(name: SearchParams) {
        return searchParams.get(name) ?? undefined;
    }

    return { get, updateSearchParams };
}