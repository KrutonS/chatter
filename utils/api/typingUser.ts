import { gql, useMutation, useSubscription } from "@apollo/client";
import { Falsy } from "react-native";
import { User } from "react-native-gifted-chat";
import { roomIdVar } from "../global";

export const checkTypingQuery = gql`
	subscription typingUser(${roomIdVar}:String!){
		typingUser(roomId:${roomIdVar}){
			email
			firstName
			id
			lastName
			role
		}
	}`;

export const setTypingQuery = gql`
	mutation setTyping(${roomIdVar}:String!){
		typingUser(roomId:${roomIdVar}){
			email
			firstName
			id
			lastName
			role
  	}
	}`;

export type TypingResponse = { typingUser: User };
type OnInputChange = (text: string | Falsy) => void;

type UseUserTyping = (
  user: string | Falsy,
  id: string
) => [boolean, OnInputChange];

export const useUserTyping: UseUserTyping = (loggedUserId, roomId) => {
  const { data: typingUserData } = useSubscription<
    TypingResponse,
    RoomVariable
  >(checkTypingQuery, {
    variables: { roomId },
  });
  const [setTyping] = useMutation<TypingResponse, RoomVariable>(setTypingQuery);

  const isTyping =
    typingUserData &&
    loggedUserId &&
    typingUserData.typingUser._id !== loggedUserId;

  const onInputChange: OnInputChange = (text) => {
    if (text) setTyping({ variables: { roomId } });
  };

  return [!!isTyping, onInputChange];
};
