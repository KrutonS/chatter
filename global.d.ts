import { ImageProps } from "react-native";

declare type Room = {
  id: string;
  name: string;
  mess?: string;
  image?: ImageProps["source"];
  active?: boolean;
  lastActive?: string;
};

declare interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
