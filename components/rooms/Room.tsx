import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Button,
  Image,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
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
  const { name, active, image, lastActive, mess = "abc", id } = room;
  const textStyle = active ? textActive : undefined;
  const navigation = useNavigation<NavigationProp<ParamList, "Rooms">>();
  const onPress = () => {
    (navigation.navigate as any)("Chat", { roomId: id });
  };
  return (
    <Pressable style={active ? roomViewActive : roomView} onPress={onPress}>
      {image ? (
        <Image source={image} style={imageStyle} />
      ) : (
        <ProfilePlaceholder {...imageStyle} />
      )}
      <View style={texts}>
        <Typography style={textStyle} type="h3">
          {name}
        </Typography>
        {mess && (
          <Typography style={textStyle} type="bodyText">
            {mess}
          </Typography>
        )}
      </View>
      <Status active={active} lastActive={lastActive} />
    </Pressable>
  );
};

export default RoomView;

const roomView: ViewStyle = {
  position: "relative",
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
const textActive: TextStyle = { color: whiteColor };
const imageStyle: ImageStyle & SvgProps = {
  width: 64,
  height: 64,
  marginRight: screenMargin,
};

const texts: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "80%",
};
