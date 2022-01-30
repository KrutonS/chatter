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
  const date = moment(insertedAt, "YYYY-MM-DD hh:mm:ss").toDate();
  if (isNaN(date as never)) console.error("Error parsing date");
  const iUser = userToGiftedUser(user);

  return { _id: id, createdAt: date, text: body, user: iUser };
};
