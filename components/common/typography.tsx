import { Text, TextStyle } from "react-native";
import { typoStyles } from "../../styles";

interface CommonProps {
  style?: TextStyle;
  children: string;
}

type TypoKeys = keyof typeof typoStyles;
type TypoProps = { type: TypoKeys } & CommonProps;

const Typography = ({ type, children, style }: TypoProps) => {
  const Typo = ({ children, style }: CommonProps) => (
    <Text style={{ ...typoStyles[type], ...style }}>{children}</Text>
  );
  return <Typo style={style}>{children}</Typo>;
};

export default Typography;
