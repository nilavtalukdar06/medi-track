import Navbar from "@/app/navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TextAnimate } from "@/components/magicui/text-animate";
import Cards from "@/components/cards";
import AppointmentStatistics from "@/components/appointment-statistics";
import PatientTable from "@/components/patient-table";

export default async function AdminPanel() {
  const user = await currentUser();
  if (user?.privateMetadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <section className="w-full">
      <Navbar />
      <div className="px-6 py-2">
        <TextAnimate className="text-3xl text-gray-600 font-semibold tracking-wide text-center sm:text-start">
          Welcome Admin
        </TextAnimate>
        <TextAnimate className="text-sm text-gray-500 tracking-wide font-light my-1.5 text-center sm:text-start">
          Start day with managing new appointments
        </TextAnimate>
      </div>
      <AppointmentStatistics>
        <Cards />
        <div className="px-6 mt-6 mb-12">
          <PatientTable />
        </div>
      </AppointmentStatistics>
    </section>
  );
}
