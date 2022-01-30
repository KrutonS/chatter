import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { useReceiveMessage } from "../../lib/commonQueries";
import {
  smallSpace,
  plum500,
  radius,
  bigSpace,
  whiteColor,
} from "../../styles";
import ProfileImage from "../common/ProfileImage";
import Typography from "../common/Typography";
import Status from "./Status";

type Props = { room: Room };

const RoomView = ({ room }: Props) => {
  const { name, active, image, lastActive, mess, id } = room;
  const { data } = useReceiveMessage(id);

  const receivedMessage = data?.messageAdded.body;
  const textStyle = active || receivedMessage ? textActive : undefined;
  const { navigate } = useNavigation<NavigationProp<ParamList, "Rooms">>();
  type FixNavigate = (to: "Chat", arg: ParamList["Chat"]) => void;
  const onPress = () => {
    (navigate as FixNavigate)("Chat", { roomId: id });
  };
  return (
    <Pressable style={active ? roomViewActive : roomView} onPress={onPress}>
      <ProfileImage source={image} style={imageStyle} />
      <View style={texts}>
        <Typography style={textStyle} type="h3">
          {name}
        </Typography>
        <Typography style={textStyle} type="bodyText">
          {receivedMessage || mess || "Not active"}
        </Typography>
      </View>
      <Status active={active} lastActive={lastActive} />
    </Pressable>
  );
};

export default RoomView;

const roomView: ViewStyle = {
  position: "relative",
  paddingVertical: smallSpace,
  paddingHorizontal: bigSpace,
  marginBottom: smallSpace,
  backgroundColor: whiteColor,
  borderRadius: radius,
  display: "flex",
  flexDirection: "row",
};
const roomViewActive: ViewStyle = {
  ...roomView,
  backgroundColor: plum500,
};
const textActive: TextStyle = { color: whiteColor };
const imageStyle: ImageStyle & SvgProps = {
  width: 64,
  height: 64,
  marginRight: bigSpace,
};

const texts: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "80%",
};
