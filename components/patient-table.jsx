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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.expected_date}</TableCell>
                <TableCell
                  className={`flex border justify-start items-center text-xs px-2 py-1 rounded-full w-fit gap-x-1.5 my-4 ${
                    item.status === "pending" &&
                    "bg-[#79B5EC]/10 border-[#79B5EC]/50 text-[#79B5EC]"
                  } ${
                    item.status === "accepted" &&
                    "bg-[#24AE7C]/10 border-[#24AE7C]/50 text-[#24AE7C]"
                  } ${
                    item.status === "cancelled" &&
                    "bg-[#F37877]/10 border-[#F37877]/50 text-[#F37877]"
                  }`}
                >
                  <p>{item.status.toUpperCase()}</p>
                </TableCell>
                <TableCell>{item.doctor}</TableCell>
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
