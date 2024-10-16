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

    const { data } = useGetQuery<any>(`/users/getUsers?searchQuery=${searchTrigger}`
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
