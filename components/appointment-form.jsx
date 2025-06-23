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
import { motion } from "motion/react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AppointmentForm() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const { isSignedIn } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      redirect("/sign-in");
    }
  };

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <motion.div
        className="space-y-1.5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
      </motion.div>
      <motion.div
        className="space-y-1.5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Label className="text-xs text-gray-500" htmlFor="reason">
          Reason for appointment
        </Label>
        <Input placeholder="ex: Annual, monthly check-up" id="reason" />
      </motion.div>
      <motion.div
        className="space-y-1.5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Label className="text-xs text-gray-500" htmlFor="comments">
          Additional comments/notes
        </Label>
        <Textarea
          placeholder="ex: Prefer afternoon appointments, if possible"
          id="comments"
        />
      </motion.div>
      <motion.div
        className="space-y-1.5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
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
      </motion.div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Button
          className="bg-[#24AE7C] hover:bg-green-700 text-white w-full"
          type="submit"
        >
          Request Appointment
        </Button>
      </motion.div>
    </form>
  );
}
