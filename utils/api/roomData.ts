import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { userFrag } from "../../lib/api";
import { handleError } from "../errors";
import { messageToGiftedMessage } from "../gifted";
import { roomIdVar } from "../global";

export const roomQuery = gql`
	query Room(${roomIdVar}:String!){
		room(id:${roomIdVar}){
			id
			name
			messages{
				body
				id
				insertedAt
				${userFrag}
			}
			# ${userFrag}
		}
	}`;

export type RoomResponse = {
  room: ChatRoom & {
    messages: ChatMessage[];
  };
};

export const useRoomQuery = (roomId: string) =>
  useQuery<RoomResponse, RoomVariable>(roomQuery, {
    variables: { roomId },
  });

type AddMessage = (m: IMessage) => void;
type UseRoomDataReturn = [IMessage[], AddMessage, ChatRoom | null];

export const useRoomData = (roomId: string): UseRoomDataReturn => {
  const { data, error, refetch: refetchMessages } = useRoomQuery(roomId);
  const [messages, setMessages] = useState<IMessage[]>([]);

  if (error) handleError(error);

  // Update messages on enter
  useEffect(() => {
    refetchMessages({ roomId });
  }, []);

  // If fetched messages, set
  useEffect(() => {
    if (data) {
      const fetchedMessages = data.room.messages.map(messageToGiftedMessage);
      setMessages(fetchedMessages);
    }
  }, [data]);

  const addMessage = (m: IMessage) => setMessages((msg) => [...msg, m]);
  return [messages, addMessage, data?.room || null];
};
