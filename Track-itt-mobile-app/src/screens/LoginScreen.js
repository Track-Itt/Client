import * as React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Snackbar,
  useTheme,
} from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarColor, setSnackbarColor] = React.useState("");

  const theme = useTheme();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isSuccess = email === "" && password === "";
      if (isSuccess) {
        setSnackbarMessage("Login successful!");
        setSnackbarColor("green");
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
          navigation.replace('HomeTabs', {
            screen: 'Home',
          });          
        }, 1500);
      } else {
        setSnackbarMessage("Login failed. Please try again.");
        setSnackbarColor("red");
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarColor }}
      >
        {snackbarMessage}
      </Snackbar>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Track-itt Login
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.primary,
          },
        ]}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        mode="outlined"
        theme={{ roundness: 10 }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.primary,
          },
        ]}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
        mode="outlined"
        theme={{ roundness: 10 }}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={[
          styles.button,
          { backgroundColor: theme.colors.primary, borderRadius: 10 },
        ]}
        contentStyle={{ paddingVertical: 8 }}
      >
        Login
      </Button>
      <View style={styles.linksContainer}>
        <Text
          style={[styles.link, { color: theme.colors.accent }]}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          Don’t have an account? Sign Up
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  linksContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  link: {
    marginTop: 8,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
