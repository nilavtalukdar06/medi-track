"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import Loader from "./ui/loading";
import { useContext, useEffect } from "react";
import { StatisticsContext } from "./appointment-statistics";
import { useUser } from "@clerk/nextjs";

export default function PatientTable() {
  const { fetchAppointments, data, isLoading } = useContext(StatisticsContext);
  const { user } = useUser();

  useEffect(() => {
    user && user?.publicMetadata?.role === "admin" && fetchAppointments();
  }, [user]);

  return (
    <section>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your recent appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>Phoenix Baker</TableCell>
                <TableCell>Jan 4, 2022</TableCell>
                <TableCell className="flex bg-[#24AE7C]/10 border-[#24AE7C]/50 border justify-start items-center text-xs px-2 py-1 rounded-full w-fit gap-x-1.5 my-4">
                  <Calendar size={15} color="#24AE7C" />
                  <p className="text-[#24AE7C]">Scheduled</p>
                </TableCell>
                <TableCell>Dr. Alex Ramirez</TableCell>
                <TableCell className="text-right flex justify-end items-center gap-x-4">
                  <button className="cursor-pointer text-[#24AE7C]">
                    Schedule
                  </button>
                  <button className="cursor-pointer text-red-500">
                    Cancel
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
