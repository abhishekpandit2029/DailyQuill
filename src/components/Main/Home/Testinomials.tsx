import Image from "next/image"

export default function Testinomials() {
    return (
        <section className="relative isolate overflow-hidden bg-white px-6 py-12 lg:px-8" id="Endorsements">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <Image alt="workation" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" className="mx-auto" width="200" height="20" />
                <figure className="mt-6">
                    <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                        <p>
                            “Our platform has transformed daily journaling into a secure, effortless experience. We&apos;re proud to provide a space where users can capture their thoughts with ease and confidence. Seeing our platform become a trusted part of people&apos;s lives is truly fulfilling.”
                        </p>
                    </blockquote>
                    <figcaption className="mt-6">
                        <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                            <div className="font-semibold text-gray-900">Abhishek Pandit</div>
                            <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                                <circle r={1} cx={1} cy={1} />
                            </svg>
                            <div className="text-gray-600">Founder & CEO of DailyQuill</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}
