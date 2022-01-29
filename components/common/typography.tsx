import { Text, TextProps, TextStyle } from "react-native";
import { typoStyles } from "../../styles";

interface CommonProps {
  style?: TextStyle;
  children: string;
}

type TypoKeys = keyof typeof typoStyles;
type TypoProps = { type: TypoKeys } & CommonProps & TextProps;

const Typography = ({ type, children, style, ...other }: TypoProps) => {
  const Typo = ({ children, style }: CommonProps) => (
    <Text {...other} style={{ ...typoStyles[type], ...style }}>
      {children}
    </Text>
  );
  return <Typo style={style}>{children}</Typo>;
};

export default Typography;
