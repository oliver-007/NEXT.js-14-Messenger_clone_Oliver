import bcrypt from "bcrypt";
import dbConnect from "@/app/libs/db";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

// *********   Create / Register user   ********
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    await dbConnect();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required !" },
        { status: 400 }
      );
    }
    // check duplicate user
    const userExist = await User.findOne({ email }).lean().exec();
    if (userExist) {
      return NextResponse.json(
        { message: "Email Already used !" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const user = await User.create({
      name,
      email,
      hashedPassword,
    });

    // if (user) {
    //   return NextResponse.json(
    //     { message: `New user " ${user.name} " registerd Success` },
    //     { status: 201 }
    //   );
    // }
    return NextResponse.json(user);
  } catch (error) {
    console.log("Registr api error ------", error);
    return NextResponse.json(
      {
        message: "Failed to create user",
      },
      { status: 400 }
    );
  }
}
