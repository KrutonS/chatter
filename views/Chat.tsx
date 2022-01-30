import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  User,
} from "react-native-gifted-chat";
import ChatHeaderItem from "../components/chat/ChatHeaderItem";
import ChatMessage from "../components/chat/Message";
import TypingIndicator from "../components/chat/TypingIndicator";
import ProfileImage from "../components/common/ProfileImage";
import Header from "../components/Header";
import PhoneIcon from "../components/icons/Phone";
import SendIcon from "../components/icons/Send";
import VideoCallIcon from "../components/icons/VideoCall";
import { userFrag } from "../lib/api";
import {
  roomIdKey,
  RoomVariable,
  useReceiveMessage,
} from "../lib/commonQueries";
import {
  blackColor,
  blue300,
  smallSpace,
  fill,
  mainView,
  radius,
  bigSpace,
  whiteColor,
} from "../styles";
import { useUser } from "../utils/contexts/user";
import { messageToGiftedMessage, userToGiftedUser } from "../utils/gifted";

const roomQuery = gql`
query Room($${roomIdKey}:String!){
	room(id:$${roomIdKey}){
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

type RoomResponse = {
  room: Room & {
    messages: ChatMessage[];
  };
};

// const messageAddedQuery = gql`
// 	subscription messageAdded($${roomIdKey}:String!){
// 		messageAdded(roomId:$${roomIdKey}){
// 			body
// 			id
// 			insertedAt
// 			${userFrag}
// 		}
// 	}`;

const checkTypingQuery = gql`
	subscription typingUser($${roomIdKey}:String!){
		typingUser(roomId:$${roomIdKey}){
			email
			firstName
			id
			lastName
			role
		}
	}
`;

const setTypingQuery = gql`
	mutation setTyping($${roomIdKey}:String!){
		typingUser(roomId:$${roomIdKey}){
			email
			firstName
			id
			lastName
			role
  	}
	}`;

const sendMessageQuery = gql`
	mutation sendMessage($${roomIdKey}:String!, $body:String!){
		sendMessage(roomId:$${roomIdKey}, body:$body){
			id
			body
			insertedAt
			${userFrag}
		}
	}`;

const Buttons = () => (
  <>
    <PhoneIcon />
    <VideoCallIcon />
  </>
);

function sortMessages(messages: IMessage[]) {
  return messages.sort(({ createdAt: aTime }, { createdAt: bTime }) => {
    if (aTime instanceof Date && bTime instanceof Date) {
      return bTime.getTime() - aTime.getTime();
    }
    return (aTime as number) - (bTime as number);
  });
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { params } = useRoute<RouteProp<ParamList, "Chat">>();
  const { roomId } = params;

  // #region API
  const { data, refetch: refetchMessages } = useQuery<
    RoomResponse,
    RoomVariable
  >(roomQuery, {
    variables: { roomId },
  });

  const { data: typingUserData } = useSubscription<
    { typingUser: User },
    RoomVariable
  >(checkTypingQuery, {
    variables: { roomId },
  });

  const { data: receivedMessageData } = useReceiveMessage(roomId);
  // const { data: receivedMessageData } = useSubscription<
  //   { messageAdded: ChatMessage },
  //   RoomVariable
  // >(messageAddedQuery, { variables: { roomId } });

  const [setTyping] = useMutation<{ typingUser: ChatUser }, RoomVariable>(
    setTypingQuery
  );

  const [sendMessage, { data: sendMessageData }] =
    useMutation<{ sendMessage: ChatMessage }>(sendMessageQuery);
  // #endregion

  // #region Get Current User
  const [loggedUser] = useUser();
  const room = data?.room;

  if (loggedUser === undefined) throw new Error("No user logged in!");
  // #endregion

  // #region Message updates
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

  // If sent message, push it to messages
  useEffect(() => {
    if (sendMessageData) {
      const sentMessage = messageToGiftedMessage(sendMessageData.sendMessage);
      setMessages([...messages, sentMessage]);
    }
  }, [sendMessageData]);

  // If received message, push it to messages
  useEffect(() => {
    if (receivedMessageData) {
      const receivedMessage = messageToGiftedMessage(
        receivedMessageData.messageAdded
      );
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessageData]);
  // #endregion

  //#region Check typing
  const isTyping =
    typingUserData && typingUserData.typingUser._id !== loggedUser.id;
  // #endregion

  return (
    <View style={mainView}>
      <Header Buttons={Buttons}>
        {room && <ChatHeaderItem room={room} />}
      </Header>
      {room && (
        <GiftedChat
          onInputTextChanged={(text) => {
            if (text) setTyping({ variables: { roomId } });
          }}
          onSend={(_messages) =>
            _messages.forEach(({ text: body }) =>
              sendMessage({ variables: { roomId, body } })
            )
          }
          messages={sortMessages(messages)}
          user={userToGiftedUser(loggedUser)}
          timeTextStyle={{ right: styles.hideText, left: styles.hideText }}
          messagesContainerStyle={styles.container}
          renderAvatar={() => (
            <ProfileImage style={styles.avatar} source={room.image} />
          )}
          renderMessage={(props) => (
            <ChatMessage message={props} loggedUser={loggedUser} />
          )}
          renderSend={(props) => (
            <Send {...props} containerStyle={styles.sendButton}>
              <SendIcon style={fill} />
            </Send>
          )}
          renderInputToolbar={(props) => (
            <InputToolbar {...props} containerStyle={styles.toolbar} />
          )}
          renderFooter={() => <TypingIndicator isTyping={isTyping} />}
          textInputProps={{ style: styles.input }}
          alwaysShowSend
          infiniteScroll
          isCustomViewBottom
        ></GiftedChat>
      )}
    </View>
  );
};

const sendSize = 34;
const toolbarGap = 17;
const inputHeight = 41;
const { width: windowWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2 * smallSpace,
    paddingBottom: inputHeight - 12,
  },
  hideText: {
    display: "none",
  },
  avatar: {
    width: 24,
    height: 24,
  },
  input: {
    backgroundColor: whiteColor,
    borderRadius: radius,
    borderBottomRightRadius: 0,
    height: inputHeight,
    width: windowWidth - 2 * bigSpace - toolbarGap - sendSize - 8,
    paddingHorizontal: 15,
    marginRight: toolbarGap,
    color: blackColor,
  },
  toolbar: {
    height: 73,
    width: "100%",
    padding: bigSpace,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    backgroundColor: blue300,
  },
  sendButton: {
    width: sendSize,
    height: sendSize,
  },
});

export default Chat;
