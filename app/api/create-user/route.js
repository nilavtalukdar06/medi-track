import arcjet, { tokenBucket } from "@arcjet/next";
import connection from "@/db/mongodb";
import userModel from "@/model/user.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

    if (!userId || user?.privateMetadata?.role == "admin") {
      return NextResponse.json(
        {
          message: "unauthorized",
        },
        { status: 401 }
      );
    } else {
      const data = await request.json();
      if (
        !data.occupation ||
        !data.gender ||
        !data.date_of_birth ||
        !data.medical_conditions ||
        !data.current_medications
      ) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }
      await connection();
      const existing_user = await userModel.findOne({ user_id: userId });
      if (existing_user) {
        return NextResponse.json(
          {
            message: "user is already present",
          },
          { status: 409 }
        );
      }
      await userModel.create({ ...data, user_id: userId });
      return NextResponse.json(
        {
          message: "user data is saved to the database",
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
