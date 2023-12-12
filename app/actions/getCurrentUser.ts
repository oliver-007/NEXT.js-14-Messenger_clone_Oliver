import getSession from "./getSessions";
import prismadb from "../libs/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    // console.log("sessiong data---", session);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
