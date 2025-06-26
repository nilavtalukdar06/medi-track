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

export default function Mobile() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);

  return (
    <form className="sm:hidden">
      <Drawer>
        <DrawerTrigger className="cursor-pointer text-[#24AE7C]">
          Schedule
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <form className="p-5">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="reason">Reason for appointment</Label>
                <Input
                  id="reason"
                  name="reason"
                  required={true}
                  placeholder="ex: Annual, montly check-up"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="comments">Additional Comments</Label>
                <Input
                  id="comments"
                  name="comments"
                  required={true}
                  placeholder="Additional Comments"
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
                      step="1"
                      defaultValue="10:30:00"
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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
            >
              Schedule Appointment
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form>
  );
}
