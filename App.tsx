import { ApolloProvider } from "@apollo/client";
import AppLoading from "expo-app-loading";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import widlarzClient from "./lib/api";
import { UserProvider } from "./utils/contexts/user";
import { useLoadFonts } from "./utils/hooks/loadFonts";
import Rooms from "./views/Rooms";
import Chat from "./views/Chat";

const disableHeader = { header: () => null };

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) return <AppLoading />;
  const Stack = createNativeStackNavigator<ParamList>();

  return (
    <ApolloProvider client={widlarzClient}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Rooms">
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={disableHeader}
            />
            <Stack.Screen
              name="Rooms"
              component={Rooms}
              options={disableHeader}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </ApolloProvider>
  );
}
