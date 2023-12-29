import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "../libs/prismadb";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, " error get_conversation id ----");
    return null;
  }
};

export default getConversationById;
