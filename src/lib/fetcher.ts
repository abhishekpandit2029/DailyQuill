import { message } from "antd";
import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { Cookies } from "react-cookie";

async function fetcher({ url, init, error }: any) {
    try {
        const accessToken = new Cookies().get("token");
        const res = await fetch(url, {
            ...init,
            headers: {
                "Accept-Encoding": "gzip",
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
                ...init.headers,
            },
        });

        if (res.headers.get("Content-Type") === "text/csv") {
            return await res.text();
        }

        let json;

        try {
            json = await res.json();
        } catch {
            json = {};
        }

        if (res.ok) return json;

        throw new Error(json.error || Object.values(json).join(", "));

    } catch (e) {
        if (e instanceof Error && e.message) {
            throw e;
        } else {
            throw new Error(error);
        }
    }
}

function getFetcher(baseURL: string) {
    return (key: string | [string, string]) => {
        const url = Array.isArray(key) ? key[0] : key;
        if (!url) {
            throw new Error("Invalid URL key provided.");
        }

        return fetcher({
            url: baseURL + url,
            init: {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
            error: "An error occurred while getting the data.",
        });
    };
}

export default function useMutation<ExtraArgs, Data>(
    key: string,
    fetcher: (_key: string, _options?: { arg: ExtraArgs }) => Promise<Data>,
    config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
    return useSWRMutation<Data, Error, string, ExtraArgs>(key, fetcher, {
        onError(error) {
            message.error(error.message);
        },
        throwOnError: false,
        ...config,
    });
}

type TKey = string | [string, Record<string, string>] | null;

function useQuery<Data>(
    key: TKey,
    fetcher: (
        _key: string,
        _options?: { arg: Record<string, string> }
    ) => Promise<Data>,
    config?: SWRConfiguration<Data, Error>
) {
    if (!key) {
        throw new Error("A valid key must be provided.");
    }

    return useSWR<Data, Error>(key, fetcher, {
        keepPreviousData: true,
        ...config,
    });
}

export function useGetQuery<Data>(
    key: string | null,
    config?: SWRConfiguration<Data, Error>
) {
    const formattedKey = key || "/";
    return useQuery<Data>(
        formattedKey,
        getFetcher("/api"),
        config
    );
}

function formatBody<ExtraArgs>(
    arg: ExtraArgs,
    payload?: Record<string, string>
) {
    if (arg) {
        return JSON.stringify(arg);
    }
    if (payload) {
        return JSON.stringify(payload);
    }
    return undefined;
}

export function postJsonFetcher(baseURL: string) {
    return <ExtraArgs>(
        key: string | [string, Record<string, string>],
        options?: Readonly<{ arg: ExtraArgs }>
    ) => {
        const isArray = Array.isArray(key);
        return fetcher({
            url: baseURL + (isArray ? key[0] : key),
            init: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: formatBody(options?.arg, isArray ? key[1] : undefined),
            },
            error: "An error occurred while posting the data.",
        });
    };
}


export function usePostMutation<ExtraArgs, Data>(
    key: string,
    config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>
) {
    return useMutation<ExtraArgs, Data>(
        key,
        postJsonFetcher("/api"),
        config
    );
}

//======================================================================================

export function deleteFetcher(baseURL: string) {
    return <ExtraArgs>(key: string, options?: Readonly<{ arg: ExtraArgs }>) => // This basically for payload.
        fetcher({
            url: baseURL + key,
            init: {
                method: "DELETE", headers: {
                    "Content-Type": "application/json",
                },
                body: options ? JSON.stringify(options.arg) : undefined,
            },
            error: "An error occurred while deleting the data.",
        });
}

export function useDeleteMutation<Data>(
    key: string,
    config?: SWRMutationConfiguration<Data, Error, string>
) {
    return useMutation<unknown, Data>(
        key,
        deleteFetcher("/api"),
        config
    );
}

//======================================================================================

export function putFetcher(baseURL: string) {
    return <ExtraArgs>(key: string, options?: Readonly<{ arg: ExtraArgs }>) =>
        fetcher({
            url: baseURL + key,
            init: {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: options ? JSON.stringify(options.arg) : undefined,
            },
            error: "An error occurred while replacing the data.",
        });
}

export function patchFetcher(baseURL: string) {
    return <ExtraArgs>(key: string, options?: Readonly<{ arg: ExtraArgs }>) =>
        fetcher({
            url: baseURL + key,
            init: {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: options ? JSON.stringify(options.arg) : undefined,
            },
            error: "An error occurred while modifying the data.",
        });
}


export function usePutMutation<Data>(
    key: string,
    config?: SWRMutationConfiguration<Data, Error, string>
) {
    return useMutation<unknown, Data>(
        key,
        putFetcher("/api"),
        config
    );
}

export function usePatchMutation<Data>(
    key: string,
    config?: SWRMutationConfiguration<Data, Error, string>
) {
    return useMutation<unknown, Data>(
        key,
        patchFetcher("/api"),
        config
    );
}