import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content 
          title="Track-itt" 
          titleStyle={{ 
            fontFamily: 'Roboto-Medium', 
            fontSize: 20 
          }} 
        />
      </Appbar.Header>
      <Text style={styles.title}>Welcome to Track-itt!</Text>
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  title: {
    color: '#1E3A8A',
    fontSize: 24,
    marginBottom: 16,
  },
});

export default MainScreen;
