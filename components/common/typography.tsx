import { Text, TextProps, TextStyle } from "react-native";
import { typoStyles } from "../../styles";

type TypoKeys = keyof typeof typoStyles;
interface CustomProps {
  style?: TextStyle;
  children: string;
  type: TypoKeys;
}
export type TypoProps = CustomProps & Omit<TextProps, "style">;

const Typography = ({ type, children, style, ...other }: TypoProps) => {
  let textStyle: TextStyle = typoStyles[type];
  if (style) textStyle = { ...textStyle, ...style };
  return (
    <Text {...other} style={textStyle}>
      {children}
    </Text>
  );
};

export default Typography;
