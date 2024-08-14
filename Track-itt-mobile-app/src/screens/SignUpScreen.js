import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const theme = useTheme();

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Add logic for sign-up, e.g., API call
      navigation.navigate('HomeScreen'); // Replace with actual home screen when implemented
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>Sign Up for Track-itt</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        mode="outlined"
        theme={{ roundness: 10 }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
        mode="outlined"
        theme={{ roundness: 10 }}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
        mode="outlined"
        theme={{ roundness: 10 }}
      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        style={[styles.button, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
        contentStyle={{ paddingVertical: 8 }}
      >
        Sign Up
      </Button>
      <View style={styles.linksContainer}>
        <Text
          style={[styles.link, { color: theme.colors.accent }]}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Already have an account? Login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    alignItems: 'center',
  },
  link: {
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
