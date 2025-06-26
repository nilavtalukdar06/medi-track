import connection from "@/db/mongodb";
import appointmentModel from "@/model/appointment.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || user?.privateMetadata?.role !== "admin") {
      return NextResponse.json(
        {
          message: "unauthorized",
        },
        { status: 401 }
      );
    } else {
      await connection();
      const result = await appointmentModel.find({});
      return NextResponse.json(result, { status: 200 });
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
