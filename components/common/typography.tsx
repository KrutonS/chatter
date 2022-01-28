import { FC } from "react";
import { Text, TextStyle } from "react-native";
import { typoStyles } from "../../styles";
import { capitalize } from "../../utils/string";

interface CommonProps {
  style?: TextStyle;
  children: string;
}
const typoEntries = Object.entries<TextStyle>(typoStyles);
type TypoKeys = keyof typeof typoStyles;
type NewKeys = Capitalize<TypoKeys>;

const typography = typoEntries.reduce((obj, [key, typoStyle]) => {
  const newKey = capitalize(key);
  const Component = ({ children, style }: CommonProps) => (
    <Text style={{ ...typoStyle, ...style }}>{children}</Text>
  );
  return { ...obj, [newKey]: Component };
}, {} as Record<NewKeys, FC<CommonProps>>);

type TypoProps = { type: TypoKeys } & CommonProps;
const Typography = ({ type, children, style }: TypoProps) => {
  const SelectedTypo = typography[capitalize(type)];

  return <SelectedTypo style={style}>{children}</SelectedTypo>;
};

export default Typography;
