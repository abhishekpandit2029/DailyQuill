import { LuSignalLow } from "react-icons/lu";
import { LuSignalMedium } from "react-icons/lu";
import { LuSignalHigh } from "react-icons/lu";
import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";
import { TbCircleNumber4 } from "react-icons/tb";

export const languages = [
  { value: 'English', label: 'English' },
  { value: 'Assamese', label: 'Assamese' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Bodo', label: 'Bodo' },
  { value: 'Dogri', label: 'Dogri' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Kashmiri', label: 'Kashmiri' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Konkani', label: 'Konkani' },
  { value: 'Maithili', label: 'Maithili' },
  { value: 'Malayalam', label: 'Malayalam' },
  { value: 'Manipuri', label: 'Manipuri' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Nepali', label: 'Nepali' },
  { value: 'Oriya', label: 'Oriya' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Sanskrit', label: 'Sanskrit' },
  { value: 'Santali', label: 'Santali' },
  { value: 'Sindhi', label: 'Sindhi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Urdu', label: 'Urdu' },
];

export const pronouns = [
  { value: 'He/him/his', label: 'He/him/his' },
  { value: 'She/her/hers', label: 'She/her/hers' },
  { value: 'They/them/theirs', label: 'They/them/theirs' },
];

export const mapPaymentCard = [
  {
    id: 1,
    name: "Starter",
    icon: <LuSignalLow className="text-2xl" />,
    monthly: "199",
    annual: "1000",
    text: "Get started with essential features to build and grow your social presence effortlessly."
  },
  {
    id: 2,
    name: "Pro",
    icon: <LuSignalMedium className="text-2xl" />,
    monthly: "499",
    annual: "4000",
    text: "Unlock advanced tools and insights to boost engagement and expand your influence faster."
  },
  {
    id: 3,
    name: "Advance",
    icon: <LuSignalHigh className="text-2xl" />,
    monthly: "1999",
    annual: "10000",
    text: "Maximize your impact with powerful features designed for ultimate social media success."
  }
]

export const mapProcessFlow = [
  {
    icon: <TbCircleNumber1 className="text-4xl text-indigo-600 mr-2" />,
    title: "Choose Your Plan",
    text: "Select the perfect plan that aligns with your goals. Whether you're just starting out or looking to scale, we have flexible options to match your needs. Compare features, pick what suits you best, and get ready to grow!"
  },
  {
    icon: <TbCircleNumber2 className="text-4xl text-indigo-600 mr-2" />,
    title: "Make a Secure Payment",
    text: "Pay quickly and safely using Razorpay, ensuring a seamless and encrypted transaction. No hidden charges, no recurring fees—just a straightforward, hassle-free payment process designed for your convenience."
  },
  {
    icon: <TbCircleNumber3 className="text-4xl text-indigo-600 mr-2" />,
    title: "Unlock Premium Features",
    text: "Once your payment is confirmed, you get instant access to all premium tools and benefits. From advanced analytics to exclusive engagement boosters, everything you need is unlocked and ready to help you grow. No waiting—just results!"
  },
  {
    icon: <TbCircleNumber4 className="text-4xl text-indigo-600 mr-2" />,
    title: "Grow & Succeed",
    text: "Now it’s time to take your social presence to the next level! Utilize premium features, track your growth, and maximize your impact effortlessly. Stay ahead of the competition with continuous updates and dedicated support."
  }
]