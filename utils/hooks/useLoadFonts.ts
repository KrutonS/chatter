import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { FontSource } from "@expo-google-fonts/poppins/useFonts";
import { handleError } from "../handleError";

const FONTS: Record<Fonts, FontSource> = {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  "SF Compact Text": "/assets/fonts/SFCompactText-Regular.ttf",
  "SF Compact Display": "/assets/fonts/SFCompactDisplay-Regular.ttf",
};

export function useLoadFonts() {
  const [fontsLoaded, error] = useFonts(FONTS);

  if (error) handleError(error);
  return fontsLoaded;
}
