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
import { useRouter } from "next/navigation";
import Spinner from "./ui/spinner";
import toast from "react-hot-toast";

export default function AppointmentForm() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor: "",
    reason_for_appointment: "",
    additional_comments: "",
    expected_date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      if (!formData.doctor || !formData.expected_date) {
        toast.error("Complete the form");
        return;
      } else {
        try {
          setIsLoading(true);
          const response = await fetch("/api/create-appointment", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(
              `error: ${response.status}, ${response.statusText}`
            );
          }
          toast.success("Your request has been forwarded");
          setFormData({
            ...formData,
            doctor: "",
            reason_for_appointment: "",
            additional_comments: "",
            expected_date: "",
          });
          setDate(null);
        } catch (error) {
          console.error(error.messsage);
          toast.error("Failed to request appointment");
        } finally {
          setIsLoading(false);
        }
      }
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
        <Select
          className="w-full"
          value={formData.doctor}
          onValueChange={(value) => setFormData({ ...formData, doctor: value })}
        >
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
        <Input
          placeholder="ex: Annual, monthly check-up"
          id="reason"
          value={formData.reason_for_appointment}
          required={true}
          onChange={(e) =>
            setFormData({ ...formData, reason_for_appointment: e.target.value })
          }
        />
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
          value={formData.additional_comments}
          required={true}
          onChange={(e) =>
            setFormData({ ...formData, additional_comments: e.target.value })
          }
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
                setFormData({
                  ...formData,
                  expected_date: date ? date.toLocaleDateString() : "",
                });
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
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Request Appointment"}
        </Button>
      </motion.div>
    </form>
  );
}
