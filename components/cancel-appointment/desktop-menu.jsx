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
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import Spinner from "../ui/spinner";
import toast from "react-hot-toast";
import { StatisticsContext } from "../appointment-statistics";

export default function DesktopMenu({ email, id, status }) {
  const { fetchAppointments } = useContext(StatisticsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    comments: "",
  });

  const cancelAppointment = async (e) => {
    try {
      e.preventDefault();
      if (!formData.reason || !formData.comments) {
        toast.error("Fill the form");
        return;
      }
      setIsLoading(true);
      const response = await fetch("/api/cancel-appointment/send", {
        method: "POST",
        body: JSON.stringify({ ...formData, email: email, appointment_id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`error: ${response.status}, ${response.statusText}`);
      }
      toast.success("Cancelled Appointment");
      setFormData({ ...formData, reason: "", comments: "" });
      fetchAppointments();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to cancel the appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <form className="hidden sm:block">
        <DialogTrigger asChild>
          <button
            className={`${status === "cancelled" && "hidden"} text-center cursor-pointer text-red-500`}
          >
            Cancel
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your appointment
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="cancel">Reason for cancellation</Label>
              <Input
                id="cancel"
                name="cancel"
                value={formData.reason}
                required={true}
                placeholder="ex: Conflict in time"
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
          </div>
          <DialogFooter className="w-full">
            <Button
              type="submit"
              variant="destructive"
              className="w-full my-3"
              disabled={isLoading}
              onClick={cancelAppointment}
            >
              {isLoading ? <Spinner /> : "Cancel Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
