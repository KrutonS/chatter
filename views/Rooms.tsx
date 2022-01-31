import { useEffect } from "react";
import Main from "../components/common/MainView";
import RoomsContainer from "../components/rooms";
import { useRooms } from "../utils/api/rooms";
import { useHeader } from "../utils/contexts/Header";

const Rooms = () => {
  const rooms = useRooms();
  const [, setHeader] = useHeader();
  useEffect(() => setHeader(null), []);
  return (
    <Main>
      <RoomsContainer rooms={rooms} />
    </Main>
  );
};

export default Rooms;
