import AppLoading from "expo-app-loading";
import { useLoadFonts } from "./utils/hooks/useLoadFonts";
import Rooms from "./views/Rooms";

export default function App() {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) return <AppLoading />;

  return <Rooms />;
}
