import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { dialogPadding, plum500, screenMargin, whiteColor } from "../../styles";
import ProfileImage from "../common/ProfileImage";
import Typography from "../common/Typography";

type Props = { room: Room };

const ChatHeaderItem = ({ room }: Props) => {
  const { name, image, active, lastActive } = room;
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => nav.goBack()}>
        <Image
          style={styles.caret}
          source={require("../../assets/caret.png")}
        />
        {/* <Typography type="h3" style={styles.caret}>
          &lt;
        </Typography> */}
      </Pressable>
      <ProfileImage source={image} style={styles.image} />
      <View style={styles.titleContainer}>
        <Typography type="h4" style={styles.title} numberOfLines={1}>
          {name}
        </Typography>
        <Typography type="bodyText" style={styles.statusText}>
          {active ? "Active now" : lastActive ?? "Not active"}
        </Typography>
      </View>
    </View>
  );
};
const { width: windowWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: windowWidth - 96 - screenMargin * 2 - dialogPadding,
  },
  image: {
    width: 44,
    height: 44,
    marginRight: dialogPadding,
    marginLeft: 18,
  },
  caret: {
    width: 8,
    height: 16,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: plum500,
    maxWidth: "87%",
  },
  statusText: {
    color: whiteColor,
  },
});

export default ChatHeaderItem;
