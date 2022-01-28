import { FC, useState } from "react";
import { Pressable } from "react-native";
import { buttons } from "../../styles";
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

export default CustomButton;
