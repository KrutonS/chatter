import { Button, StyleSheet, TextStyle, View } from "react-native";
import CustomButton from "../components/common/Button";
import Input from "../components/common/Input";
import Typography from "../components/common/Typography";
import {
  authBottomSpace,
  authTopSpace,
  bigSpace,
  blue300,
  mainView,
  smallSpace,
  whiteColor,
} from "../styles";

const LogIn = () => {
  return (
    <View style={{ ...mainView, ...styles.main }}>
      <Typography type="h1" style={styles.h1}>
        Welcome Back
      </Typography>
      <Typography type="h2" style={styles.h2}>
        Log in and stay in touch with&nbsp;everyone!
      </Typography>
      <View style={styles.inputView}>
        <Input label="e-mail address" />
        <Input label="password" secure />
      </View>

      <View style={styles.bottomView}>
        <CustomButton onPress={() => undefined}>Log in</CustomButton>
        <View style={styles.bottomTextsView}>
          <Typography type="caption2" style={styles.whiteText}>
            Don&apos;t have an account?
          </Typography>
          <Typography type="buttonTextSmall" style={styles.signUp}>
            Sign up
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: blue300,
    paddingTop: authTopSpace,
  },
  h1: {
    marginBottom: smallSpace * 2,
  },
  h2: {
    color: whiteColor,
    marginBottom: smallSpace * 3,
  },
  whiteText: {
    color: whiteColor,
  },
  inputView: {
    marginHorizontal: bigSpace,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    left: bigSpace,
    width: "100%",
    marginBottom: authBottomSpace,
  },
  bottomTextsView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  signUp: {
    marginLeft: smallSpace,
  },
});

export default LogIn;
