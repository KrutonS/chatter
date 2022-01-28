import { Text, TextStyle, View, ViewProps } from "react-native";
import { H1 } from "../components/common/Typography";
import Header from "../components/Header";
import RoomsIcon from "../components/icons/Rooms";
import SearchIcon from "../components/icons/Search";

const Buttons = () => (
  <>
    <SearchIcon />
    <RoomsIcon />
  </>
);
const Rooms = () => {
  return (
    <View>
      <Header Buttons={Buttons}>
        <H1>Rooms</H1>
      </Header>
    </View>
  );
};

export default Rooms;
