import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }
    return params?.coversationId as string;
  }, [params.conversationId]);

  const isOpen = useMemo(() => {
    return !!conversationId; // useing "!!" before any string, in return converts them into boolen
  }, [conversationId]);

  return useMemo(() => {
    return { isOpen, conversationId };
  }, [isOpen, conversationId]);
};

export default useConversation;
