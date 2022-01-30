import { FC, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { bigSpace, radius, typoStyles, whiteColor } from "../../styles";
import VisionIcon from "../icons/Vision";
import VisionLowIcon from "../icons/VisionLow";
import Typography from "./Typography";

interface Props extends Omit<TextInputProps, "secureTextEntry" | "style"> {
  label: string;
  secure?: boolean;
}

const Input: FC<Props> = ({ label, secure, ...other }) => {
  const [shouldHide, setShouldHide] = useState(secure);
  const onPress = () => setShouldHide(!shouldHide);
  return (
    <>
      <Typography type="label" style={styles.label}>
        {label}
      </Typography>
      <View>
        <TextInput
          secureTextEntry={shouldHide}
          style={styles.input}
          {...other}
        />
        {secure && (
          <Pressable style={styles.button} onPress={onPress}>
            {shouldHide ? <VisionLowIcon /> : <VisionIcon />}
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    ...typoStyles.titleAndInput,
    backgroundColor: whiteColor,
    borderRadius: radius,
    height: 47,
    paddingHorizontal: bigSpace,
    marginBottom: bigSpace,
  },
  label: {
    color: whiteColor,
  },
  button: {
    height: 54.5,
    position: "absolute",
    right: bigSpace,
    top: 15,
  },
});

export default Input;
