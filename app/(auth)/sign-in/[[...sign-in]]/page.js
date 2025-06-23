import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex flex-col justify-center items-center my-24 gap-y-4">
      <div className="flex justify-center items-center gap-x-3">
        <Image
          src="/logo.svg"
          height={42}
          width={42}
          alt="logo"
          className="rounded-lg p-1.5 border shadow bg-gray-200/20"
        />
        <h1 className="flex text-xl font-medium text-gray-800">Medi Track</h1>
      </div>
      <SignIn signUpForceRedirectUrl="/onboarding" />
    </div>
  );
}
