import { Falsy } from "react-native";
import { useReceiveMessage } from "../queries/receiveMessage";
import { useRoomData } from "../queries/roomData";
import { useSendMessage } from "../queries/sendMessage";
import { useUserTyping } from "../queries/typingUser";

const useRoom = (loggedUserId: string | Falsy, roomId: string) => {
  const [messages, addMessage, room] = useRoomData(roomId);
  useReceiveMessage(roomId, addMessage);
  const onSend = useSendMessage(roomId, addMessage);
  const [isTyping, onInputChange] = useUserTyping(loggedUserId, roomId);

  return { messages, isTyping, onInputChange, onSend, room };
};

export default useRoom;
