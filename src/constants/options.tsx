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
    name: "Basic",
    icon: <LuSignalLow className="text-2xl" />,
    monthly: "199",
    annual: "1000",
    text: "Get started with essential features to build and grow your social presence effortlessly."
  },
  {
    id: 2,
    name: "Premium",
    icon: <LuSignalMedium className="text-2xl" />,
    monthly: "499",
    annual: "4000",
    text: "Unlock advanced tools and insights to boost engagement and expand your influence faster."
  },
  {
    id: 3,
    name: "Pro",
    icon: <LuSignalHigh className="text-2xl" />,
    monthly: "1999",
    annual: "10000",
    text: "Maximize your impact with powerful features designed for ultimate social media success."
  }
]

export const mapProcessFlow = [
  {
    icon: <TbCircleNumber1 className="text-3xl text-indigo-600 mr-2" />,
    title: "Choose Your Plan",
    text: "Pick the best plan for your goals and start growing instantly."
  },
  {
    icon: <TbCircleNumber2 className="text-3xl text-indigo-600 mr-2" />,
    title: "Make a Secure Payment",
    text: "Pay safely via Razorpay with an easy, one-time hassle-free transaction."
  },
  {
    icon: <TbCircleNumber3 className="text-3xl text-indigo-600 mr-2" />,
    title: "Unlock Premium Features",
    text: "Get instant access to exclusive tools, analytics, and engagement boosters."
  },
  {
    icon: <TbCircleNumber4 className="text-3xl text-indigo-600 mr-2" />,
    title: "Grow & Succeed",
    text: "Elevate your presence, track progress, and stay ahead with premium features."
  }
]
