import { ScrollView, ViewStyle } from "react-native";
import RoomView from "./Room";

const RoomsContainer = () => {
  return (
    <ScrollView style={roomsContainer}>
      <RoomView></RoomView>
      <RoomView></RoomView>
      <RoomView></RoomView>
      <RoomView></RoomView>
    </ScrollView>
  );
};

const roomsContainer: ViewStyle = { marginTop: 36 };

export default RoomsContainer;
