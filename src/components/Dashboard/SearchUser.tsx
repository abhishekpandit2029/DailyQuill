// "use client";

// import { useState } from "react";
// import { Select, Spin } from "antd";
// import { debounce } from "lodash";
// import { DefaultOptionType } from "antd/es/cascader";
// import { useGetQuery } from "@/lib/fetcher";

// const useTickerSelect = (searchTerm: string) => {
//     const [selectOptions, setSelectOptions] = useState<DefaultOptionType[]>();

//     const { data, isLoading } = useGetQuery<any>(`/users/getUsers?searchQuery=${searchTerm}`,
//         {
//             onError() {
//                 setSelectOptions([]);
//             },
//             onSuccess() {
//                 setSelectOptions(
//                     data?.map?.((item: string) => ({
//                         label: item,
//                         value: item,
//                     }))
//                 );
//             },
//         }
//     );

//     return { selectOptions, isLoading };
// };

// interface ITickerSelect {
//     handleOptionChange: (_value: string) => void;
// }

// export default function SearchUser({ handleOptionChange }: ITickerSelect) {
//     const [searchTerm, setSearchTerm] = useState<string>("");
//     const { selectOptions, isLoading } = useTickerSelect(searchTerm);

//     const handleSearchChange = debounce((value: string) => {
//         setSearchTerm(value);
//     }, 1000);

//     return (
//         <div className="flex items-center gap-4">
//             <p className="w-11 text-base font-medium tab:text-lg">Ticker</p>
//             <Select
//                 labelInValue
//                 placeholder="Search Ticker"
//                 filterOption={false}
//                 onSelect={(value) => handleOptionChange(value.value)}
//                 onSearch={handleSearchChange}
//                 notFoundContent={isLoading ? <Spin size="small" /> : null}
//                 options={selectOptions}
//                 className="w-60"
//                 showSearch
//                 allowClear
//             />
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { DefaultOptionType } from "antd/es/cascader";
import { useGetQuery } from "@/lib/fetcher";
import { Select } from "antd";


interface ITickerSelect {
    handleOptionChange: (_value: string) => void;
}

export default function TradingViewSelectStocks({
    handleOptionChange,
}: ITickerSelect) {
    const [searchTrigger, setSearchTrigger] = useState<string>("");
    const [selectOptions, setSelectOptions] = useState<DefaultOptionType[]>([]);

    const { data, isLoading } = useGetQuery<any>(`/users/getUsers?searchQuery=${searchTrigger}`
    );

    const handleSearchChange = debounce((value: string) => {
        setSearchTrigger(value);
    }, 500);

    useEffect(() => {
        const options = Array.isArray(data?.items || data)
            ? (data.items || data)
                .map((item: { name: string; symbol: string }) => ({
                    label: item.name,
                    value: item.symbol,
                }))
            : [];

        setSelectOptions(options);
    }, [data]);

    return (
        <div className="flex items-center gap-4">
            <Select
                labelInValue
                placeholder="Search Stocks"
                filterOption={false}
                onSelect={(value) => handleOptionChange(value.value)}
                onSearch={handleSearchChange}
                options={selectOptions}
                className="w-60"
                showSearch
            />
        </div>
    );
}
