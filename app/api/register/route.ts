import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";

// *********   Create / Register user   ********
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !name || !password) {
      return new NextResponse("All Fields Required !", { status: 400 });
    }

    // check duplicate user
    const userExist = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "Email Already used !" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // if (user) {
    //   return NextResponse.json(
    //     { message: `New user " ${user.name} " registerd Success` },
    //     { status: 201 }
    //   );
    // }
    return NextResponse.json(user);
  } catch (error: any) {
    console.log("Register api error ------", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
