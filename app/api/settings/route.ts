import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, image } = await request.json();
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json("UnAuthorized", { status: 401 });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log("SETTING_ERROR API ROUTE ----", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

// 06:53:40
