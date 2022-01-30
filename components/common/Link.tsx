import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { typoStyles } from "../../styles";
import Typography, { TypoProps } from "./Typography";

interface Props extends Omit<TypoProps, "type"> {
  to: keyof ParamList;
  type?: TypoProps["type"];
}

const SimpleLink = ({ to, type = "buttonTextSmall", ...other }: Props) => {
  const { navigate } = useNavigation<NavigationProp<ParamList, "Rooms">>();
  return <Typography {...other} type={type} onPress={() => navigate(to)} />;
};

export default SimpleLink;
