import Image from "next/image";
import forgotpassword from "@/stuff/forgotpassword.svg";

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex tab:px-8 tab:pb-4 lap:px-16 lap:pb-8 items-center justify-evenly">
      <div className="hidden tab:flex">
        <Image src={forgotpassword} className="min-w-full" alt="Logo" />
      </div>
      <div className="flex flex-col space-y-4 w-screen tab:w-[25rem] px-6 tab:p-0">
        {children}
      </div>
    </div>
  );
}
