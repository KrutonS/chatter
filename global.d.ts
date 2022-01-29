import { ImageProps } from "react-native";
declare global {
  type Room = {
    id: string;
    name: string;
    mess?: string;
    image?: ImageProps["source"];
    active?: boolean;
    lastActive?: string;
  };

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }
  type ParamList = {
    Rooms: undefined;
    Chat: { roomId: string };
  };
}
