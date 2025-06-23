"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();

  return (
    <header className="px-7 py-5 flex w-full justify-between items-center gap-x-4">
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
      {isLoaded ? (
        isSignedIn ? (
          <div className="flex justify-center items-center gap-x-3">
            {!pathname.startsWith("/admin") && (
              <Link href="/admin">
                <p className="text-sm text-gray-600">Admin</p>
              </Link>
            )}
            <UserButton />
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-[#24ae7c] text-white hover:bg-green-600">
              Sign In
            </Button>
          </Link>
        )
      ) : (
        <Skeleton className="h-[40px] w-[100px]" />
      )}
    </header>
  );
}
