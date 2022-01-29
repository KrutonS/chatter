import { Image, ImageStyle, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { Room } from "../../global";
import {
  dialogPadding,
  plum500,
  radius,
  screenMargin,
  white,
} from "../../styles";
import Typography from "../common/Typography";
import ProfilePlaceholder from "../icons/ProfilePlaceholder";
import Status from "./Status";

const mock: Room = {
  id: "2",
  name: "name",
  mess: "abcdefg",
  lastActive: "abcd",
};

const RoomView = () => {
  return (
    <View style={mock.active ? roomViewActive : roomView}>
      {mock.image ? (
        <Image source={mock.image} style={image} />
      ) : (
        <ProfilePlaceholder {...image} />
      )}
      <View>
        <Typography type="h3">{mock.name}</Typography>
        <Typography type="bodyText">ABCDEFGHIJKLMNOP</Typography>
      </View>
      <Status active={mock.active} lastActive={mock.lastActive} />
    </View>
  );
};

export default RoomView;

const roomView: ViewStyle = {
  position: "relative",
  // padding: `${dialogPadding} ${screenMargin}`,
  paddingVertical: dialogPadding,
  paddingHorizontal: screenMargin,
  marginBottom: dialogPadding,
  backgroundColor: white,
  borderRadius: radius,
  display: "flex",
  flexDirection: "row",
};
const roomViewActive: ViewStyle = {
  ...roomView,
  backgroundColor: plum500,
};

const image: ImageStyle & SvgProps = {
  width: 64,
  height: 64,
  marginRight: screenMargin,
};
