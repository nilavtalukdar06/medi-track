"use client";
import { doctors } from "@/data/doctors";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AppointmentForm() {
  return (
    <form className="flex flex-col gap-y-4">
      <div className="space-y-1.5">
        <Label>Doctor</Label>
        <Select className="w-full">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Doctors</SelectLabel>
              {doctors.map((doctor) => (
                <SelectItem value={doctor.name} key={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
