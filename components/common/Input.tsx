import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import {
  Control,
  FieldError,
  FieldValues,
  Path,
  useController,
  UseControllerReturn,
} from "react-hook-form";
import {
  bigSpace,
  errorColor,
  plum500,
  radius,
  typoStyles,
  whiteColor,
} from "../../styles";
import VisionIcon from "../icons/Vision";
import VisionLowIcon from "../icons/VisionLow";
import Typography from "./Typography";
import { handleInputError } from "../../utils/handleError";

interface Props<T extends FieldValues>
  extends Omit<
    TextInputProps,
    "secureTextEntry" | "style" | keyof UseControllerReturn["field"]
  > {
  label: string;
  name: Path<T>;
  control: Control<T>;
  secure?: boolean;
  required?: boolean;
  pattern?: RegExp;
}

const Input = <T extends FieldValues>({
  label,
  secure,
  name,
  autoFocus,
  control,
  required,
  pattern,
  ...other
}: Props<T>) => {
  const [shouldHide, setShouldHide] = useState(secure);
  const [focused, setFocused] = useState(autoFocus);
  const onPress = () => setShouldHide(!shouldHide);
  const { field, formState } = useController<T>({
    name,
    control,
    rules: { required, pattern },
  });
  const errors = formState.errors[name] as FieldError | undefined;
  const { onBlur, onChange } = field;
  let inputStyle = styles.input;
  if (focused) inputStyle = { ...inputStyle, ...styles.focused };
  if (errors) inputStyle = { ...styles.input, ...styles.error };

  return (
    <>
      <Typography type="label" style={styles.label}>
        {label}
      </Typography>
      <View>
        <TextInput
          secureTextEntry={shouldHide}
          style={inputStyle}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onChangeText={onChange}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          {...other}
        />
        {secure && (
          <Pressable style={styles.button} onPress={onPress}>
            {shouldHide ? <VisionLowIcon /> : <VisionIcon />}
          </Pressable>
        )}
        {errors && (
          <Typography type="caption2" style={styles.errorText}>
            {handleInputError(errors)}
          </Typography>
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
  focused: {
    borderColor: plum500,
    borderWidth: 2,
    borderStyle: "solid",
  },
  error: {
    borderColor: errorColor,
    borderWidth: 2,
    borderStyle: "solid",
  },
  button: {
    height: 54.5,
    position: "absolute",
    right: bigSpace,
    top: 15,
    overflow: "hidden",
  },
  errorText: {
    color: errorColor,
    position: "absolute",
    bottom: -4,
    right: 0,
  },
});

export default Input;
