"use client";
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
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import { useState } from "react";
import Spinner from "./ui/spinner";
import toast from "react-hot-toast";
import { updateRole } from "@/utils/actions/update-metadata";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    occupation: "",
    gender: "",
    date_of_birth: "",
    medical_conditions: "",
    current_medications: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData.date_of_birth || !formData.gender) {
        toast.error("Incomplete Fields");
        return;
      }
      setIsLoading(true);
      const response = await fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`error: ${response.status}, ${response.statusText}`);
      }
      await updateRole();
      toast.success("Onboarding Completed");
      setFormData({
        ...formData,
        occupation: "",
        gender: "",
        date_of_birth: "",
        medical_conditions: "",
        current_medications: "",
      });
      setDate(null);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to complete onboarding process");
    } finally {
      setIsLoading(false);
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
        <Label className="text-xs text-gray-500" htmlFor="occupation">
          Occupation
        </Label>
        <Input
          placeholder="ex: Software Engineer"
          id="occupation"
          value={formData.occupation}
          onChange={(e) =>
            setFormData({ ...formData, occupation: e.target.value })
          }
          required={true}
        />
      </motion.div>
      <motion.div
        className="space-y-1.5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Label className="text-xs text-gray-500" htmlFor="gender">
          Gender
        </Label>
        <Select
          className="w-full"
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
        >
          <SelectTrigger className="w-full" id="gender">
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </motion.div>
      <motion.div
        className="space-y-1.5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Label className="text-xs text-gray-500" htmlFor="date">
          Date of birth
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild id="date">
            <Button
              variant="outline"
              id="date"
              className="w-full justify-start text-gray-600 font-normal"
            >
              <CalendarIcon />
              {date ? date.toLocaleDateString() : "Select date of birth"}
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
                  date_of_birth: date ? date.toLocaleDateString() : "",
                });
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 place-items-center w-full"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="space-y-1.5 w-full">
          <Label className="text-xs text-gray-500" htmlFor="medical-conditions">
            Medical Conditions
          </Label>
          <Textarea
            placeholder="Enter your current medical conditions"
            id="medical-conditions"
            required={true}
            className="w-full"
            value={formData.medical_conditions}
            onChange={(e) =>
              setFormData({ ...formData, medical_conditions: e.target.value })
            }
          />
        </div>
        <div className="space-y-1.5 w-full">
          <Label
            className="text-xs text-gray-500"
            htmlFor="current-medications"
          >
            Current Medications
          </Label>
          <Textarea
            placeholder="Enter your current medications"
            id="current-medications"
            required={true}
            value={formData.current_medications}
            onChange={(e) =>
              setFormData({ ...formData, current_medications: e.target.value })
            }
            className="w-full"
          />
        </div>
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
          {isLoading ? <Spinner /> : "Complete Onboarding"}
        </Button>
      </motion.div>
    </form>
  );
}
