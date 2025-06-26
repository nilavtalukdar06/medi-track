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

export default function DesktopMenu() {
  return (
    <Dialog>
      <form className="hidden sm:block">
        <DialogTrigger asChild>
          <button className="cursor-pointer text-red-500">Cancel</button>
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
                required={true}
                placeholder="ex: Conflict in time"
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
          <DialogFooter className="w-full">
            <Button type="submit" variant="destructive" className="w-full my-3">
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
