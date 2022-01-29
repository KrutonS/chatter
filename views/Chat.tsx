import { RouteProp, useRoute } from "@react-navigation/native";
import { FC } from "react";
import { Text, View } from "react-native";

const Chat = () => {
  const { params } = useRoute<RouteProp<ParamList, "Chat">>();

  return (
    <View>
      <Text>Works!</Text>
    </View>
  );
};

export default Chat;
