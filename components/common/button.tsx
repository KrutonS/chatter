import { FC, useState } from "react";
import { Pressable, Text } from "react-native";
import { buttons, typography } from "../../styles";

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
      <Text style={typography.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default CustomButton;
