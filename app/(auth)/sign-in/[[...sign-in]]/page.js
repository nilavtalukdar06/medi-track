import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center my-24">
      <SignIn signUpForceRedirectUrl="/onboarding" />
    </div>
  );
}
