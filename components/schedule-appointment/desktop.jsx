"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function Desktop() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);

  return (
    <Dialog>
      <form className="hidden sm:block">
        <DialogTrigger asChild>
          <button className="cursor-pointer text-[#24AE7C]">Schedule</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              Please fill in the following details to schedule
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="reason">Reason for appointment</Label>
              <Input
                id="reason"
                name="reason"
                defaultValue="ex: Annual, montly check-up"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="comments">Additional Comments</Label>
              <Input
                id="comments"
                name="comments"
                defaultValue="Additional Comments"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date-picker" className="px-1">
                    Date
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-32 justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
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
                <div className="flex flex-col gap-3">
                  <Label htmlFor="time-picker" className="px-1">
                    Time
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="10:30:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="w-full my-3">
            <Button
              type="submit"
              className="w-full bg-[#24AE7C] hover:bg-green-600"
            >
              Schedule Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
