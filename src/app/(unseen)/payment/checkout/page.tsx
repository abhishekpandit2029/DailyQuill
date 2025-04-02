"use client";

import * as React from "react";
import Script from "next/script";
import { Button, message, Segmented, Tag } from "antd";
import { useEffect, useState } from "react";
import { useGetQuery, usePostMutation } from "@/lib/fetcher";
import { mapPaymentCard, mapProcessFlow } from "@/constants/options";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import revalidate from "@/lib/revalidate";
import { cookieOptions, getExpiryFromToken } from "@/lib/jwt";

interface IOrderRes {
  orderId: string
}

interface IOrderReq {
  amount: number
}

export default function Checkout() {
  const [duration, setDuration] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>()
  const [price, setPrice] = useState<string | undefined>();
  const { push } = useRouter()
  const [{ userId, isSubscribed, token }, setCookie] = useCookies(["userId", "isSubscribed", "token"]);

  const { trigger: subscriptionTrigger } = usePostMutation<any, any>("/users/subscription", {
    onSuccess() {
      revalidate(`/users/subscription/${userId}`)
      setCookie("isSubscribed", true, {
        ...cookieOptions,
        expires: getExpiryFromToken(token),
      });
      setPrice("")
      push("/dashboard/profile")
    }
  });

  const { trigger: verifyTrigger } = usePostMutation<any, any>("/razorpay/verify", {
    onSuccess() {
      subscriptionTrigger({
        userId,
        selectedPlan,
        price,
        paymentId: data?.orderId,
        planDuration: duration,
      })
    }
  });

  const { trigger, data } = usePostMutation<IOrderReq, IOrderRes>("/razorpay/order", {
    onSuccess(data) {
      const orderId = data.orderId
      try {
        const options = {
          key: process.env.RAZORPAY_KEY_SECRET,
          amount: parseFloat(price!) * 100,
          currency: "INR",
          name: "DailyQuill",
          description: "Make fast, secure, and seamless payments with our trusted payment gateway. We ensure 100% encrypted transactions with no hidden charges or recurring fees. Choose your preferred payment method and unlock premium features instantly",
          order_id: orderId,
          notify: {
            sms: true,
            email: true
          },
          handler: async function (response: any) {
            const data = {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            verifyTrigger(data)
          },
          theme: {
            color: "#3F51B5",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response: any) {
          message.error(response.error.description);
        });
        paymentObject.open();
      } catch {
        message.error("Something went wrong");
      }
    },
    onError: () => {
      message.error("Something went wrong");
    },
  });

  useEffect(() => {
    if (price) {
      trigger({
        amount: parseFloat(price!) * 100,
      })
    }
  }, [price, trigger])

  return (
    <div className="flex flex-col space-y-10">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="px-4">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex justify-center items-center text-center flex-col space-y-4 w-[50%] mx-auto tab:p-0">
          <p className="font-bold text-gray-900 text-4xl lap:text-6xl" style={{ lineHeight: "4.5rem" }}>
            Supercharge Your Social Growth Securely.
          </p>
          <p className="mt-6 text-base tab:text-lg leading-6 tab:leading-8 text-gray-600">
            Boost your react with fast, secure and hassle free payment.
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex justify-center">
          <Segmented<string>
            options={[
              { value: 'monthly', label: "Monthly" },
              { value: 'year', label: "Annual" },
            ]}
            onChange={(value) => {
              setDuration(value);
            }}
            size="large"
            className="custom-segmented"
          />
        </div>

        <div className="flex justify-center items-center flex-wrap gap-6 w-[90%] lap:w-[80%] mx-auto">
          {mapPaymentCard?.map((items) => (
            <div key={items?.id} className="max-w-[18rem] rounded-xl overflow-hidden shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex">
                  {items?.icon}
                  <h2 className="text-lg font-semibold text-gray-800">{items?.name}</h2>
                </div>
                {items?.id == 2 && <Tag color="purple">Most Popular</Tag>}
              </div>

              <div className="my-4">
                <p className="text-5xl font-semibold mb-1">₹ {duration === "monthly" ? items?.monthly : items?.annual}</p>
                <p className="text-sm">per user/{duration}</p>
              </div>

              <p className="text-gray-600 mt-2">
                {items?.text}
              </p>
              <div className="mt-4">
                <Button onClick={() => {
                  setPrice(String(duration === "monthly" ? items?.monthly : items?.annual));
                  setSelectedPlan(items?.name);
                }} type="primary" size="large" className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Get started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-center items-center flex-col space-y-8 w-[90%] lap:w-[80%] mx-auto pt-6">
        <p className="font-bold text-gray-900 text-4xl">
          Our Process Workflow
        </p>
        <div className="grid grid-cols-1 lap:grid-cols-2 gap-6">
          {mapProcessFlow?.map((items) => (
            <div key={items?.text} className="flex w-full lap:w-[30rem] flex-col space-y-2 ring-1 ring-gray-200 p-4 rounded-xl">
              <p className="flex items-center text-lg font-semibold">{items?.icon}{items?.title}</p>
              <p className="text-gray-600">{items?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
