"use client"

import { useGetQuery } from "@/lib/fetcher";
import { createContext, useContext, useState, ReactNode } from "react";
import { useCookies } from "react-cookie";

interface SubscriptionContextType {
    isSubscribed: boolean;
    loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
    isSubscribed: false,
    loading: true,
});

interface Subscription {
    _id: string;
    userId: string;
    __v: number;
    createdAt: string;
    endDate: string;
    isSubscribed: boolean;
    paymentId: string;
    planDuration: "monthly" | "yearly"; // Add more options if needed
    price: number;
    selectedPlan: "Basic" | "Premium" | "Pro"; // Add more options if needed
    startDate: string;
    status: "active" | "inactive" | "canceled"; // Add more options if needed
    updatedAt: string;
}

interface IData {
    subscription: Subscription
}


interface SubProviderProps {
    children: ReactNode;
}

export function SubscriptionProvider({ children }: SubProviderProps) {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [{ userId }] = useCookies(["userId"]);

    const { isLoading: loading } = useGetQuery<IData>(`/users/subscription/${userId}`, {
        onSuccess(data) {
            setIsSubscribed(data?.subscription?.isSubscribed)
        }
    });

    return (
        <SubscriptionContext.Provider value={{ isSubscribed, loading }}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    return useContext(SubscriptionContext);
}
