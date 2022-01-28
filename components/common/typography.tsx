import { Text, TextStyle } from "react-native";
import { typography } from "../../styles";

interface CommonProps {
  style?: TextStyle;
  children: string;
}

export const H1 = ({ children, style }: CommonProps) => (
  <Text style={{ ...typography.h1, ...style }}>{children}</Text>
);

export const H2 = ({ children, style }: CommonProps) => (
  <Text style={{ ...typography.h2, ...style }}>{children}</Text>
);

export const H3 = ({ children, style }: CommonProps) => (
  <Text style={{ ...typography.h3, ...style }}>{children}</Text>
);

export const H4 = ({ children, style }: CommonProps) => (
  <Text style={{ ...typography.h4, ...style }}>{children}</Text>
);
