import Navbar from "@/app/navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPanel() {
  const user = await currentUser();
  if (user?.privateMetadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <section>
      <Navbar />
      <div className="p-4">
        <h1>Admin Panel</h1>
      </div>
    </section>
  );
}
