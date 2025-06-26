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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import Spinner from "../ui/spinner";

export default function MobileMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    comments: "",
  });

  return (
    <form className="sm:hidden">
      <Drawer>
        <DrawerTrigger className="cursor-pointer text-red-500">
          Cancel
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cancel Appointment</DrawerTitle>
            <DrawerDescription>
              Are you sure you want to cancel your appointment
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-5">
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
            </div>
          </div>
          <DrawerFooter>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Cancel Appointment"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form>
  );
}
