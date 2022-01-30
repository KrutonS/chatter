import { gql, useSubscription } from "@apollo/client";
import { userFrag } from "./api";

export const roomIdKey = "roomId";
export type RoomVariable = { [roomIdKey]: string };

export const messageAddedQuery = gql`
	subscription messageAdded($${roomIdKey}:String!){
  messageAdded(roomId:$${roomIdKey}){
    body
    id
    insertedAt
    ${userFrag}
  }
}`;

export const useReceiveMessage = /*{ data: receivedMessageData }*/ (
  roomId: string
) =>
  useSubscription<{ messageAdded: ChatMessage }, RoomVariable>(
    messageAddedQuery,
    { variables: { roomId } }
  );
