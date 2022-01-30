import { gql, useMutation } from "@apollo/client";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/common/Button";
import Input from "../components/common/Input";
import InputContainer from "../components/common/InputContainer";
import SimpleLink from "../components/common/Link";
import Main from "../components/common/MainView";
import Typography from "../components/common/Typography";
import { userFrag } from "../lib/api";
import { authBottomSpace, bigSpace, smallSpace, whiteColor } from "../styles";
import { useUser } from "../utils/contexts/user";
import { emailRegex } from "../utils/global";
import { getErrorMessage } from "../utils/handleError";

const loginQuery = gql`
mutation login($email:String!, $password:String!){
  loginUser(email:$email,password:$password){
    token
    ${userFrag}
  }
}`;

interface FormValues {
  email: string;
  password: string;
}

type Response = {
  loginUser: {
    token: string;
    user: ChatUser;
  };
};

const LogIn = () => {
  const { control, setError, handleSubmit } = useForm<FormValues>();
  const { navigate } = useNavigation<NavigationProp<ParamList, "LogIn">>();
  const [, setUser] = useUser();
  const [sendCreds] = useMutation<Response, FormValues>(loginQuery);
  const onSubmit = async (variables: FormValues) => {
    try {
      const { data } = await sendCreds({ variables: variables });
      if (data) {
        const { user, token } = data.loginUser;
        setUser({ ...user, token });
        navigate("Rooms");
      }
    } catch (e) {
      const error = getErrorMessage(e);
      if (error === "Invalid credentials") {
        setError("password", {
          type: "validate",
          message: "Wrong email or password",
        });
      } else setError("password", { message: error });
    }
  };
  return (
    <Main forAuth>
      <Typography type="h1" style={styles.h1}>
        Welcome Back
      </Typography>
      <Typography type="h2" style={styles.h2}>
        Log in and stay in touch with&nbsp;everyone!
      </Typography>
      <InputContainer>
        <Input
          control={control}
          label="e-mail address"
          name="email"
          required
          pattern={emailRegex}
        />
        <Input
          control={control}
          label="password"
          name="password"
          secure
          required
        />
      </InputContainer>
      <View style={styles.bottomView}>
        <CustomButton onPress={handleSubmit(onSubmit)}>Log in</CustomButton>
        <View style={styles.bottomTextsView}>
          <Typography type="caption2" style={styles.whiteText}>
            Don&apos;t have an account?
          </Typography>
          <SimpleLink to="SignUp" style={styles.signUp}>
            Sign up
          </SimpleLink>
        </View>
      </View>
    </Main>
  );
};

const styles = StyleSheet.create({
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
