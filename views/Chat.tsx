import { gql, useQuery } from "@apollo/client";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
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
  blackColor,
  blue300,
  dialogPadding,
  fill,
  mainView,
  radius,
  screenMargin,
  whiteColor,
} from "../styles";
import { useUser } from "../utils/contexts/user";
import { messageToGiftedMessage, userToGiftedUser } from "../utils/gifted";

const query = gql`
query Room($id:ID){
	room(id:$id){
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

type Response = {
  room: Room & {
    messages: ChatMessage[];
  };
};
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
  const setSortMessages = (m: IMessage[]) => setMessages(sortMessages(m));

  const { params } = useRoute<RouteProp<ParamList, "Chat">>();
  const { roomId } = params;
  const { data } = useQuery<Response>(query, { variables: { id: roomId } });
  const room = data?.room;
  const [loggedUser] = useUser();
  if (loggedUser === undefined) throw new Error("No user logged in!");
  useEffect(() => {
    if (data) {
      const receivedMessages = data.room.messages.map((m) =>
        messageToGiftedMessage(m)
      );
      setSortMessages(receivedMessages);
    }
  }, [data]);
  return (
    <View style={mainView}>
      <Header Buttons={Buttons}>
        {room && <ChatHeaderItem room={room} />}
      </Header>
      {room && (
        <GiftedChat
          onSend={(message) => setSortMessages([...messages, ...message])}
          messages={messages}
          user={userToGiftedUser(loggedUser)}
          timeTextStyle={{ right: styles.hideText, left: styles.hideText }}
          messagesContainerStyle={styles.container}
          renderAvatar={() => (
            <ProfileImage style={styles.avatar} source={room.image} />
          )}
          renderMessage={(message) => (
            <ChatMessage message={message} loggedUser={loggedUser} />
          )}
          renderSend={(props) => (
            <Send {...props} containerStyle={styles.sendButton}>
              <SendIcon style={fill} />
            </Send>
          )}
          renderInputToolbar={(props) => (
            <InputToolbar {...props} containerStyle={styles.toolbar} />
          )}
          renderFooter={() => <TypingIndicator isTyping />}
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
    marginHorizontal: 2 * dialogPadding,
    paddingBottom: inputHeight - 12,
    // height:'94.5%'
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
    width: windowWidth - 2 * screenMargin - toolbarGap - sendSize - 8,
    paddingHorizontal: 15,
    marginRight: toolbarGap,
    color: blackColor,
    // position:'relative'
  },
  toolbar: {
    height: 73,
    width: "100%",
    padding: screenMargin,
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
