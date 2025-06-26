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

export default function MobileMenu() {
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
            </div>
          </form>
          <DrawerFooter>
            <Button type="submit" variant="destructive">
              Cancel Appointment
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form>
  );
}
