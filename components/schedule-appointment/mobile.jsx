"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import Spinner from "../ui/spinner";

export default function Mobile({ email, id, status }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    comments: "",
    time: "",
  });

  return (
    <form className="sm:hidden">
      <Drawer>
        <DrawerTrigger
          className={`cursor-pointer text-center text-[#24AE7C] ${status === "accepted" && "hidden"}`}
        >
          Schedule
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Schedule Appointment</DrawerTitle>
            <DrawerDescription>
              Please fill in the following details to schedule
            </DrawerDescription>
          </DrawerHeader>
          <form className="p-5">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="reason">Reason for appointment</Label>
                <Input
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  required={true}
                  placeholder="ex: Annual, montly check-up"
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="comments">Additional Comments</Label>
                <Input
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  required={true}
                  placeholder="Additional Comments"
                  onChange={(e) =>
                    setFormData({ ...formData, comments: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-3">
                <div className="flex gap-4 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="date-picker" className="px-1">
                      Date
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date-picker"
                          className="w-full justify-between font-normal"
                        >
                          {date ? date.toLocaleDateString() : "Select date"}
                          <CalendarIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          className="w-full"
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="time-picker" className="px-1">
                      Time
                    </Label>
                    <Input
                      type="time"
                      id="time-picker"
                      required={true}
                      value={formData.time}
                      step="1"
                      defaultValue="10:30:00"
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <DrawerFooter>
            <Button
              type="submit"
              className="w-full bg-[#24AE7C] hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Schedule Appointment"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form>
  );
}
