"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const { isSignedIn, isLoaded, user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    if (
      user &&
      user?.publicMetadata?.role === "admin" &&
      !pathname.startsWith("/admin")
    ) {
      redirect("/admin");
    } else if (
      user &&
      !user?.publicMetadata?.is_onboarded &&
      user?.publicMetadata?.role !== "admin" &&
      !pathname.startsWith("/onboarding")
    ) {
      redirect("/onboarding");
    }
  }, [user]);

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
            {!pathname.startsWith("/admin") &&
              user?.publicMetadata.role === "admin" && (
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
