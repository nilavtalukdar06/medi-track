import { CancelAppointment } from "@/components/email/cancel-appointment.jsx";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <nilavtalukdar06@imagify.space>",
      to: ["nilavtalukdar9@gmail.com"],
      subject: "Appointment Cancellation",
      react: CancelAppointment({ reason: "test", comments: "test" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
