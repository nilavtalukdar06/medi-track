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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function AppointmentForm() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <form className="flex flex-col gap-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-gray-500" htmlFor="doctor">
          Doctor
        </Label>
        <Select className="w-full">
          <SelectTrigger className="w-full" id="doctor">
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
      <div className="space-y-1.5">
        <Label className="text-xs text-gray-500" htmlFor="reason">
          Reason for appointment
        </Label>
        <Input placeholder="ex: Annual monthly check-up" id="reason" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-gray-500" htmlFor="comments">
          Additional comments/notes
        </Label>
        <Textarea
          placeholder="ex: Prefer afternoon appointments, if possible"
          id="comments"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-gray-500" htmlFor="date">
          Expected appointment date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild id="date">
            <Button
              variant="outline"
              id="date"
              className="w-full justify-start text-gray-600 font-normal"
            >
              <CalendarIcon />
              {date ? date.toLocaleDateString() : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        className="bg-[#24AE7C] hover:bg-green-700 text-white"
        type="submit"
      >
        Request Appointment
      </Button>
    </form>
  );
}
