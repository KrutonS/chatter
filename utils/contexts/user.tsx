import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type SetUser = Dispatch<SetStateAction<User | undefined>>;
type UserState = { user?: User; setUser: SetUser };

export const userContext = createContext<UserState>({
  setUser: (_: unknown) => _,
});
export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<undefined | User>();
  const state = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <userContext.Provider value={state}>{children}</userContext.Provider>;
};

export const useUser = (): [User | undefined, SetUser] => {
  const { user, setUser } = useContext(userContext);
  return [user, setUser];
};
