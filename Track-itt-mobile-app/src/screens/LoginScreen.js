import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { loginUser, setAuthToken } from '../services/api';

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarColor, setSnackbarColor] = React.useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
      navigation.replace('HomeTabs');
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(email, password);
      await setAuthToken(data.token);
      setSnackbarMessage('Login successful!');
      setSnackbarColor('green');
      setSnackbarVisible(true);

      setTimeout(() => {
        setLoading(false);
        navigation.replace('HomeTabs');
      }, 1500);
    } catch (error) {
      setLoading(false);
      setSnackbarMessage(error.response?.data?.message || 'Login failed.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Login</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          theme={{ roundness: 10 }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          secureTextEntry
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <Button
          mode="contained"
          onPress={handleLogin}
          style={[styles.button, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
          contentStyle={{ paddingVertical: 8 }}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" /> : 'Login'}
        </Button>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={[styles.signupLink, { color: theme.colors.primary }]}>Sign Up</Text>
          </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
