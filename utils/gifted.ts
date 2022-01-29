import moment from "moment";
import { IMessage, User } from "react-native-gifted-chat";

export const userToGiftedUser = ({
  id,
  firstName,
  lastName,
}: ChatUser): User => ({
  _id: id,
  name: firstName + lastName,
  // avatar: ProfilePlaceholder,
});

export const messageToGiftedMessage = ({
  body,
  id,
  insertedAt,
  user,
}: ChatMessage): IMessage => {
  const date = moment(insertedAt, "YYYY-MM-DD hh:mm:ss", true).toDate();
  const iUser = userToGiftedUser(user);
  return { _id: id, createdAt: date, text: body, user: iUser };
};
