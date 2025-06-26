"use client";
import { Calendar, Clock, TriangleAlert } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { motion } from "motion/react";
import { useContext, useEffect } from "react";
import { StatisticsContext } from "./appointment-statistics";
import { useUser } from "@clerk/nextjs";

export default function Cards() {
  const { user, isSignedIn } = useUser();
  const {
    isLoading,
    fetchAppointments,
    pendingAppointments,
    scheduledAppointments,
    cancelledAppointments,
  } = useContext(StatisticsContext);

  useEffect(() => {
    user &&
      isSignedIn &&
      user.publicMetadata?.role === "admin" &&
      fetchAppointments();
  }, [user, isSignedIn]);

  return (
    <section className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full place-items-center px-6 py-2">
      {isLoading ? (
        <Skeleton className="w-full h-[145.587px]" />
      ) : (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-full p-6 border shadow-sm rounded-xl [background:linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]"
        >
          <div className="flex gap-x-3 justify-start items-center">
            <Calendar color="#FFD147" />
            <p className="text-2xl font-semibold text-[#FFD147]">
              {scheduledAppointments.length}
            </p>
          </div>
          <p className="mt-5 mb-1 text-sm md:text-base text-gray-600">
            Total number of scheduled appointments
          </p>
        </motion.div>
      )}
      {isLoading ? (
        <Skeleton className="w-full h-[145.587px]" />
      ) : (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-full p-6 border shadow-sm rounded-xl [background:linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]"
        >
          <div className="flex gap-x-3 justify-start items-center">
            <Clock color="#79B5EC" />
            <p className="text-2xl font-semibold text-[#79B5EC]">
              {pendingAppointments.length}
            </p>
          </div>
          <p className="mt-5 mb-1 text-sm md:text-base text-gray-600">
            Total number of pending appointments
          </p>
        </motion.div>
      )}
      {isLoading ? (
        <Skeleton className="w-full h-[145.587px]" />
      ) : (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-full p-6 border shadow-sm rounded-xl [background:linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]"
        >
          <div className="flex gap-x-3 justify-start items-center">
            <TriangleAlert color="#FF4F4E" />
            <p className="text-2xl font-semibold text-[#FF4F4E]">
              {cancelledAppointments.length}
            </p>
          </div>
          <p className="mt-5 mb-1 text-sm md:text-base text-gray-600">
            Total number of cancelled appointments
          </p>
        </motion.div>
      )}
    </section>
  );
}
