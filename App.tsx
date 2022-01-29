import { ApolloProvider } from "@apollo/client";
import AppLoading from "expo-app-loading";
import widlarzClient from "./lib/api";
import { UserProvider } from "./utils/contexts/user";
import { useLoadFonts } from "./utils/hooks/loadFonts";
import Rooms from "./views/Rooms";

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) return <AppLoading />;

  return (
    <ApolloProvider client={widlarzClient}>
      <UserProvider>
        <Rooms />
      </UserProvider>
    </ApolloProvider>
  );
}
