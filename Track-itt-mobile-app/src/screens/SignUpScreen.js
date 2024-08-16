import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { registerUser, setAuthToken } from "../services/api";

const SignUpScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarColor, setSnackbarColor] = React.useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !employeeId) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarColor("red");
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser(name, email, password, employeeId);
      await setAuthToken(data.token);
      setSnackbarMessage("Registration successful!");
      setSnackbarColor("green");
      setSnackbarVisible(true);

      setTimeout(() => {
        setLoading(false);
        navigation.replace("HomeTabs");
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log("Error response:", error); // Log the error response
      setSnackbarMessage(
        error.response?.data?.message || "Registration failed."
      );
      setSnackbarColor("red");
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Sign Up
        </Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.primary,
            },
          ]}
          mode="outlined"
          autoCapitalize="none"
          theme={{ roundness: 10 }}
        />
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
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
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
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TextInput
          label="Employee ID"
          value={employeeId}
          onChangeText={(text) => setEmployeeId(text)}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.primary,
            },
          ]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <Button
          mode="contained"
          onPress={handleSignUp}
          style={[
            styles.button,
            { backgroundColor: theme.colors.primary, borderRadius: 10 },
          ]}
          contentStyle={{ paddingVertical: 8 }}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" /> : "Sign Up"}
        </Button>
        <View style={styles.linksContainer}>
          <Text
            style={[styles.link, { color: theme.colors.accent }]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Already have an account? Login
          </Text>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ backgroundColor: snackbarColor }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
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

export default SignUpScreen;
