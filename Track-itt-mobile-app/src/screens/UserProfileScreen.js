import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

// Dummy data for user profile
const dummyUserProfile = {
  name: 'John Doe',
  employeeId: '123456',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
};

const UserProfileScreen = () => {
  const theme = useTheme();
  const [profile, setProfile] = React.useState(dummyUserProfile);

  const handleSaveProfile = () => {
    // Save the updated profile (e.g., make an API call)
    console.log('Profile saved:', profile);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>User Profile</Text>

        <TextInput
          label="Name"
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TextInput
          label="Employee ID"
          value={profile.employeeId}
          onChangeText={(text) => setProfile({ ...profile, employeeId: text })}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TextInput
          label="Email"
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
          keyboardType="email-address"
        />
        <TextInput
          label="Phone"
          value={profile.phone}
          onChangeText={(text) => setProfile({ ...profile, phone: text })}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
          keyboardType="phone-pad"
        />

        <Button mode="contained" onPress={handleSaveProfile} style={styles.button}>
          Save Profile
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    padding: 16,
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
    borderRadius: 10,
  },
});

export default UserProfileScreen;
