import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type LoggedUser = ChatUser & { token: string };

type SetUser = Dispatch<SetStateAction<LoggedUser | undefined>>;
type UserState = { user?: LoggedUser; setUser: SetUser };

export const userContext = createContext<UserState>({
  setUser: (_: unknown) => _,
});
export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<undefined | LoggedUser>();
  const state = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <userContext.Provider value={state}>{children}</userContext.Provider>;
};

export const useUser = (): [LoggedUser | undefined, SetUser] => {
  const { user, setUser } = useContext(userContext);
  return [user, setUser];
};
