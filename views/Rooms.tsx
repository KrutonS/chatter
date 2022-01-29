import { View } from "react-native";
import Typography from "../components/common/Typography";
import Header from "../components/Header";
import RoomsIcon from "../components/icons/Rooms";
import SearchIcon from "../components/icons/Search";
import RoomsContainer from "../components/rooms";
import { mainView } from "../styles";

const Buttons = () => (
  <>
    <SearchIcon />
    <RoomsIcon />
  </>
);
const Rooms = () => {
  return (
    <View style={mainView}>
      <Header Buttons={Buttons}>
        <Typography type="h1">Rooms</Typography>
      </Header>
      <RoomsContainer />
    </View>
  );
};

export default Rooms;
