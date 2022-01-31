import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { userFrag } from "../../lib/api";

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
export const useRooms = () => {
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
  return rooms;
};
