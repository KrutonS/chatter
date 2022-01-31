import { FC } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { bigRadius, blue300, bigSpace, rowDirectionMixin } from "../styles";

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
  backgroundColor: blue300,
  borderBottomLeftRadius: bigRadius,
  borderBottomRightRadius: bigRadius,
  height: 120,
  width: "100%",
  ...rowDirectionMixin("space-between"),
  alignItems: "flex-end",
  paddingHorizontal: bigSpace,
  paddingBottom: bigSpace,
};

const headerButtons: ViewStyle = {
  ...rowDirectionMixin("space-between"),
  width: 96,
};

export default Header;
