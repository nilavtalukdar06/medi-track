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
import { useContext, useState } from "react";
import Spinner from "../ui/spinner";
import toast from "react-hot-toast";
import { StatisticsContext } from "../appointment-statistics";

export default function Desktop({ email, id, status }) {
  const { fetchAppointments } = useContext(StatisticsContext);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(undefined);
  const [formData, setFormData] = useState({
    reason: "",
    comments: "",
    time: "",
  });

  const scheduleAppointment = async (e) => {
    try {
      e.preventDefault();
      if (!date) {
        toast.error("Submit the form");
        return;
      }
      setIsLoading(true);
      const response = await fetch("/api/schedule-appointment/send", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          email: email,
          appointment_id: id,
          date: date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`error: ${response.status}, ${response.statusText}`);
      }
      toast.success("Successfully scheduled appointment");
      setFormData({
        ...formData,
        reason: "",
        comments: "",
        time: "",
        date: undefined,
      });
      fetchAppointments();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to schedule appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <form className="hidden sm:block" onSubmit={scheduleAppointment}>
        <DialogTrigger asChild>
          <button
            className={`cursor-pointer text-center text-[#24AE7C] ${status === "accepted" && "hidden"}`}
          >
            Schedule
          </button>
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
                placeholder="Additional Comments"
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
                required={true}
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
                    placeholder="10:30:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="w-full my-3">
            <Button
              type="submit"
              className="w-full bg-[#24AE7C] hover:bg-green-600"
              disabled={isLoading}
              onClick={scheduleAppointment}
            >
              {isLoading ? <Spinner /> : "Schedule Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
