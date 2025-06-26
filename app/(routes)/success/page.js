import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SuccessPage() {
  const user = await currentUser();
  if (user?.privateMetadata?.role === "admin") {
    redirect("/admin");
  }

  return (
    <section className="min-h-screen max-w-screen flex flex-col justify-center items-center p-4">
      <div className="flex justify-center items-center gap-x-3">
        <Image src="/logo.svg" height={36} width={36} alt="logo image" />
        <p className="text-2xl font-semibold text-gray-600">Medi Track</p>
      </div>
      <p className="my-2 text-gray-400 text-sm">
        We'll be in touch shortly to confirm
      </p>
      <div className="my-6">
        <Image src="/banner.svg" height={200} width={200} alt="banner image" />
      </div>
      <div className="my-3 flex flex-col justify-center items-center text-center">
        <p className="text-lg text-gray-600 font-semibold">
          You&apos;re all done!
        </p>
        <p className="my-1 text-gray-500 text-sm px-2">
          Your appointment request has been successfully submitted.
        </p>
        <Link href="/">
          <Button className="my-3 bg-[#24AE7C] hover:bg-green-600">
            Go to Home <MoveRight />
          </Button>
        </Link>
      </div>
    </section>
  );
}
