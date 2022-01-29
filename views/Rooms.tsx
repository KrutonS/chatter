import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Typography from "../components/common/Typography";
import Header from "../components/Header";
import RoomsIcon from "../components/icons/Rooms";
import SearchIcon from "../components/icons/Search";
import RoomsContainer from "../components/rooms";
import { userFrag } from "../lib/api";
import { mainView } from "../styles";
import { useUser } from "../utils/contexts/user";

const Buttons = () => (
  <>
    <SearchIcon />
    <RoomsIcon />
  </>
);

const query = gql`
  query initial {
    usersRooms {
      rooms {
        id
        name
      }
      ${userFrag}
    }
  }
`;
interface Response {
  usersRooms: {
    rooms: Room[];
    user: ChatUser;
  };
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [, setUser] = useUser();
  const { data } = useQuery<Response>(query);
  useEffect(() => {
    if (data) {
      const { rooms, user } = data.usersRooms;
      setUser(user);
      setRooms(rooms);
    }
  }, [data]);
  return (
    <View style={mainView}>
      <Header Buttons={Buttons}>
        <Typography type="h1">Rooms</Typography>
      </Header>
      <RoomsContainer rooms={rooms} />
    </View>
  );
};

export default Rooms;
