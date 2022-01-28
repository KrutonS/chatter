import {
  FlexStyle,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  poppinsBold,
  poppinsMedium,
  poppins,
  poppinsSemiBold,
  sfCompactText,
  sfCompactDisplayBold,
  sfCompactDisplay,
} from "./utils/fonts";

//#region Utils
export const centerContent: FlexStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const removeFontPadding: TextStyle = {
  includeFontPadding: false,
  padding: 0,
  textAlignVertical: "bottom",
};
//#endregion

//#region Colors
export const white = "white";
export const black = "black";
export const active = "#A8FF76";
export const error = "#FF445A";

export const plum200 = "#C692FD";
export const plum300 = "#993AFC";
export const plum500 = "#5603AD";
export const plum700 = "#390273";

export const blue100 = "#F0F8FF";
export const blue300 = "#B6DEFD";
export const blue500 = "#259DFA";

export const gray100 = "#E9EAEE";
export const gray300 = "#BFC1CC";
export const gray500 = "#9FA2B2";
//#endregion

//#region Variables
export const radius = 12;
export const bigRadius = 24;
export const screenMargin = 16;
//#endregion

//#region Typography
export const typography = StyleSheet.create({
  h1: {
    fontFamily: poppinsBold,
    fontSize: 36,
    color: plum500,
    ...removeFontPadding,
  },
  h2: { fontFamily: poppinsBold, fontSize: 28 },
  h3: { fontFamily: poppinsBold, fontSize: 22 },
  h4: { fontFamily: poppinsSemiBold, fontSize: 16 },

  buttonText: {
    fontFamily: poppinsSemiBold,
    fontSize: 16,
    letterSpacing: 1,
    color: white,
  },
  label: { fontFamily: poppinsMedium },

  titleAndInput: { fontFamily: poppinsMedium, fontSize: 15, lineHeight: 20 },
  caption: { fontFamily: poppins, fontSize: 10, lineHeight: 10 },

  bodyText: { fontFamily: sfCompactText, fontSize: 14 },
  caption2: { fontFamily: sfCompactDisplayBold, fontSize: 12, lineHeight: 16 },
  specialText: { fontFamily: sfCompactDisplay, fontSize: 12, lineHeight: 16 },
});
//#endregion

//#region Components
const defaultButton: PressableProps["style"] = {
  ...centerContent,
  width: "100%",
  backgroundColor: plum500,
  borderRadius: radius,
  height: 48,
};

export const buttons = StyleSheet.create({
  default: defaultButton,
  pressed: {
    ...defaultButton,
    backgroundColor: plum700,
  },
  disabled: {
    ...defaultButton,
    backgroundColor: gray300,
  },
});

export const header: ViewStyle = {
  borderBottomLeftRadius: bigRadius,
  borderBottomRightRadius: bigRadius,
  height: 120,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexDirection: "row",
  paddingHorizontal: screenMargin,
  paddingBottom: screenMargin,
  backgroundColor: blue300,
};
export const headerButtons: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: 96,
};
//#endregion
