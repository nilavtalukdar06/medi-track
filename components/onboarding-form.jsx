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
import { motion } from "motion/react";

export default function OnboardingForm() {
  return (
    <form className="flex flex-col gap-y-4">
      <motion.div
        className="space-y-1.5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Label className="text-xs text-gray-500" htmlFor="gender">
          Gender
        </Label>
        <Select className="w-full">
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
    </form>
  );
}
