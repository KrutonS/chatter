import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Main from "../components/common/MainView";
import Typography from "../components/common/Typography";
import Header from "../components/Header";
import RoomsIcon from "../components/icons/Rooms";
import SearchIcon from "../components/icons/Search";
import RoomsContainer from "../components/rooms";
import { userFrag } from "../lib/api";
// import { useUser } from "../utils/contexts/user";

const query = gql`
  query initial {
    usersRooms {
      rooms {
        id
        name
      }
      # ${userFrag}
    }
  }
`;
interface Response {
  usersRooms: {
    rooms: ChatRoom[];
    // user: ChatUser;
  };
}

const Buttons = () => (
  <>
    <SearchIcon />
    <RoomsIcon />
  </>
);
const Rooms = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  // const [, setUser] = useUser();
  const { data } = useQuery<Response>(query);
  useEffect(() => {
    if (data) {
      const { rooms /*user*/ } = data.usersRooms;
      // setUser(user);
      setRooms(rooms);
    }
  }, [data]);
  return (
    <Main>
      <Header Buttons={Buttons}>
        <Typography type="h1">Rooms</Typography>
      </Header>
      <RoomsContainer rooms={rooms} />
    </Main>
  );
};

export default Rooms;
