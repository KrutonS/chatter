import { FC } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { bigRadius, blue300, bigSpace } from "../styles";

interface Props {
  Buttons: FC<ViewProps>;
}
const Header: FC<Props> = ({ children, Buttons }) => {
  return (
    <View style={header}>
      {children}
      <View style={headerButtons}>
        <Buttons />
      </View>
    </View>
  );
};

const header: ViewStyle = {
  borderBottomLeftRadius: bigRadius,
  borderBottomRightRadius: bigRadius,
  height: 120,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexDirection: "row",
  paddingHorizontal: bigSpace,
  paddingBottom: bigSpace,
  backgroundColor: blue300,
};

const headerButtons: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: 96,
};

export default Header;
