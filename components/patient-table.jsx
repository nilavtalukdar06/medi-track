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
import { useContext, useEffect, useState } from "react";
import { StatisticsContext } from "./appointment-statistics";
import { useUser } from "@clerk/nextjs";
import Desktop from "./schedule-appointment/desktop";
import Mobile from "./schedule-appointment/mobile";
import DesktopMenu from "./cancel-appointment/desktop-menu";
import MobileMenu from "./cancel-appointment/mobile-menu";
import { Button } from "./ui/button";

export default function PatientTable() {
  const { fetchAppointments, data, isLoading } = useContext(StatisticsContext);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
        <div>
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
              {currentItems.map((item) => (
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
                  <TableCell className="flex justify-end items-center gap-x-4">
                    <Desktop
                      email={item.created_by}
                      id={item._id}
                      status={item.status}
                    />
                    <Mobile
                      email={item.created_by}
                      id={item._id}
                      status={item.status}
                    />
                    <DesktopMenu
                      email={item.created_by}
                      id={item._id}
                      status={item.status}
                    />
                    <MobileMenu
                      email={item.created_by}
                      id={item._id}
                      status={item.status}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center space-x-2 my-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
