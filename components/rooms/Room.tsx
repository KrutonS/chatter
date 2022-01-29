import { Image, ImageStyle, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  dialogPadding,
  plum500,
  radius,
  screenMargin,
  whiteColor,
} from "../../styles";
import Typography from "../common/Typography";
import ProfilePlaceholder from "../icons/ProfilePlaceholder";
import Status from "./Status";

type Props = { room: Room };

const RoomView = ({ room }: Props) => {
  const { name, active, image, lastActive, mess = "abc" } = room;
  return (
    <View style={active ? roomViewActive : roomView}>
      {image ? (
        <Image source={image} style={imageStyle} />
      ) : (
        <ProfilePlaceholder {...imageStyle} />
      )}
      <View style={texts}>
        <Typography type="h3">{name}</Typography>
        {mess && <Typography type="bodyText">{mess}</Typography>}
      </View>
      <Status active={active} lastActive={lastActive} />
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
  backgroundColor: whiteColor,
  borderRadius: radius,
  display: "flex",
  flexDirection: "row",
};
const roomViewActive: ViewStyle = {
  ...roomView,
  backgroundColor: plum500,
};

const imageStyle: ImageStyle & SvgProps = {
  width: 64,
  height: 64,
  marginRight: screenMargin,
};

const texts: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  // marginRight: 100,
  maxWidth: "80%",
};
