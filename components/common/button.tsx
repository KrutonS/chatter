import { FC, useState } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import {
  bigSpace,
  centerContent,
  gray300,
  plum500,
  plum700,
  radius,
} from "../../styles";
import Typography from "./Typography";

interface Props {
  children: string;
  onPress: VoidFunction;
  disabled?: boolean;
}

const CustomButton: FC<Props> = ({ onPress, children, disabled }) => {
  const [isPressed, setIsPressed] = useState(false);
  const onPressIn = () => setIsPressed(true);
  const onPressOut = () => setIsPressed(false);
  const buttonStyle = disabled
    ? buttons.disabled
    : isPressed
    ? buttons.pressed
    : buttons.default;

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Typography type="buttonText">{children}</Typography>
    </Pressable>
  );
};

const defaultButton: PressableProps["style"] = {
  ...centerContent,
  width: "100%",
  backgroundColor: plum500,
  borderRadius: radius,
  height: 48,
  marginBottom: bigSpace,
};

const buttons = StyleSheet.create({
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

export default CustomButton;
