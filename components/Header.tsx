import { FC } from "react";
import { View, ViewProps } from "react-native";
import { header, headerButtons } from "../styles";

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

export default Header;
