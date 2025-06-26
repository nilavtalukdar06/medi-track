import { CancelAppointment } from "@/components/email/cancel-appointment.jsx";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { reason, comments, email } = await request.json();
    if (!reason || !comments || !email) {
      return NextResponse.json(
        {
          message: "incomplete fields",
        },
        { status: 400 }
      );
    }
    const { data, error } = await resend.emails.send({
      from: "MediTrack <nilavtalukdar06@imagify.space>",
      to: [email],
      subject: "Appointment Cancellation",
      react: CancelAppointment({ reason: reason, comments: comments }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
