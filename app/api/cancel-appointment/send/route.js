import arcjet, { tokenBucket } from "@arcjet/next";
import { CancelAppointment } from "@/components/email/cancel-appointment.jsx";
import connection from "@/db/mongodb";
import appointmentModel from "@/model/appointment.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    const decision = await aj.protect(req, { userId, requested: 5 });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    }

    if (!userId || user?.privateMetadata?.role !== "admin") {
      return NextResponse.json(
        {
          message: "unauthorized",
        },
        { status: 401 }
      );
    }
    const { reason, comments, email, appointment_id } = await request.json();
    if (!reason || !comments || !email || !appointment_id) {
      return NextResponse.json(
        {
          message: "incomplete fields",
        },
        { status: 400 }
      );
    }
    await connection();
    const appointment = await appointmentModel.findOne({ _id: appointment_id });
    if (!appointment) {
      return NextResponse.json(
        { message: "no appointments found" },
        { status: 403 }
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

    await appointmentModel.updateOne(
      { _id: appointment_id },
      { $set: { status: "cancelled" } }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
