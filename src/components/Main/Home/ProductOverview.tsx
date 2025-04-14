import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Instant Publishing",
    description:
      "Your diary, your privacy. We provide SSL certificates to ensure that your entries remain secure and accessible only to you. Write freely, knowing your content is protected.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure and Private",
    description:
      "Your diary, your privacy. We provide SSL certificates to ensure that your entries remain secure and accessible only to you. Write freely, knowing your content is protected.",
    icon: LockClosedIcon,
  },
  {
    name: "Streamlined Entry Management",
    description:
      "Organize your thoughts effortlessly. Our simple queue system helps you manage and schedule your entries, so you never miss a day of journaling.",
    icon: ArrowPathIcon,
  },
  {
    name: "User-Friendly Interface",
    description:
      "Designed for ease of use, our platform is intuitive and user-friendly. No steep learning curves—just a smooth, enjoyable writing experience.",
    icon: CubeTransparentIcon,
  },
];

export default function ProductOverview() {
  return (
    <div className="bg-white py-12" id="ProductOverview">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-2xl tab:text-3xl font-bold leading-7 text-indigo-600 mb-4 tab:mb-6">
            Effortless Daily Journaling
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Seamlessly Document and Share Your Daily Life with Essential Tools.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Capture your thoughts, experiences, and ideas seamlessly. Our
            platform provides all the tools you need to maintain your daily
            diary or personal blog with just a few clicks.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
