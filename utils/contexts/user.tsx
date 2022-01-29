import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type SetUser = Dispatch<SetStateAction<ChatUser | undefined>>;
type UserState = { user?: ChatUser; setUser: SetUser };

export const userContext = createContext<UserState>({
  setUser: (_: unknown) => _,
});
export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<undefined | ChatUser>();
  const state = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <userContext.Provider value={state}>{children}</userContext.Provider>;
};

export const useUser = (): [ChatUser | undefined, SetUser] => {
  const { user, setUser } = useContext(userContext);
  return [user, setUser];
};
