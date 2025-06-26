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

export default function PatientTable() {
  return (
    <section>
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
          <TableRow>
            <TableCell>Phoenix Baker</TableCell>
            <TableCell>Jan 4, 2022</TableCell>
            <TableCell className="flex bg-[#24AE7C]/10 justify-start items-center text-xs px-2 py-1 rounded-full w-fit gap-x-1.5 my-2">
              <Calendar size={15} color="#24AE7C" />
              <p className="text-[#24AE7C]">Scheduled</p>
            </TableCell>
            <TableCell>Dr. Alex Ramirez</TableCell>
            <TableCell className="text-right flex justify-end items-center gap-x-4">
              <button className="cursor-pointer text-[#24AE7C]">
                Schedule
              </button>
              <button className="cursor-pointer text-red-500">Cancel</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
