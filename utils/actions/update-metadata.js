"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateRole() {
  const { userId } = await auth();
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: {
      is_onboarded: true,
    },
  });
  return "onboarded";
}
