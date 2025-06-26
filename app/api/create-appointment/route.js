import connection from "@/db/mongodb";
import appointmentModel from "@/model/appointment.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId) {
      return NextResponse.json(
        {
          message: "unauthorized",
        },
        { status: 401 }
      );
    } else {
      const data = await request.json();
      if (
        !data.doctor ||
        !data.reason_for_appointment ||
        !data.additional_comments ||
        !data.expected_date
      ) {
        return NextResponse.json(
          {
            message: "incomplete fields",
          },
          { status: 400 }
        );
      }
      await connection();
      await appointmentModel.create({
        ...data,
        created_by: user.primaryEmailAddress.emailAddress,
        name: user.fullName,
      });
      return NextResponse.json(
        {
          message: "appointment created successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `internal server error, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
