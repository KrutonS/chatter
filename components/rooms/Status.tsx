import { View, ViewStyle } from "react-native";
import { active, screenMargin, topRight } from "../../styles";
import Typography from "../common/Typography";

type StatusProps = {
  active?: boolean;
  lastActive?: string;
};

const Status = ({ active, lastActive }: StatusProps) => {
  if (active) return <View style={activeDot}></View>;
  if (lastActive)
    return (
      <Typography style={topRight(screenMargin)} type="caption">
        {lastActive}
      </Typography>
    );
  return null;
};

const activeDot: ViewStyle = {
  ...topRight,
  backgroundColor: active,
  width: 12,
  height: 12,
  borderRadius: 100,
};

export default Status;
