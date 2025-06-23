import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="px-7 py-5 flex w-full justify-between gap-x-4">
      <Link className="flex justify-center items-center gap-x-3" href="/">
        <Image
          src="/logo.svg"
          height={42}
          width={42}
          alt="logo"
          className="rounded-lg p-1.5 border shadow bg-gray-200/20"
        />
        <h1 className="hidden sm:flex text-xl font-medium text-gray-800">
          Medi Track
        </h1>
      </Link>
      <Button className="bg-[#24ae7c] text-white hover:bg-green-600">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </header>
  );
}
