export * from "./theme";
import { StyleSheet } from "react-native";
import {
  poppinsBold,
  poppinsMedium,
  poppins,
  poppinsSemiBold,
  sfCompactText,
  sfCompactDisplayBold,
  sfCompactDisplay,
} from "../utils/fonts";
import {} from "./theme";

const typography = StyleSheet.create({
  h1: { fontFamily: poppinsBold, fontSize: 36 },
  h2: { fontFamily: poppinsBold, fontSize: 28 },
  h3: { fontFamily: poppinsBold, fontSize: 22 },
  h4: { fontFamily: poppinsSemiBold, fontSize: 16 },

  buttonText: { fontFamily: poppinsSemiBold, fontSize: 16, letterSpacing: 1 },
  label: { fontFamily: poppinsMedium },

  titleAndInput: { fontFamily: poppinsMedium, fontSize: 15, lineHeight: 20 },
  caption: { fontFamily: poppins, fontSize: 10, lineHeight: 10 },

  bodyText: { fontFamily: sfCompactText, fontSize: 14 },
  caption2: { fontFamily: sfCompactDisplayBold, fontSize: 12, lineHeight: 16 },
  specialText: { fontFamily: sfCompactDisplay, fontSize: 12, lineHeight: 16 },
});
