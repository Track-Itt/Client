import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.welcomeText, { color: theme.colors.primary }]}>
          Welcome to Track-itt
        </Text>

        {/* Add Product Section */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={styles.cardTitle}>Add Product</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('AddProductScreen')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              contentStyle={{ paddingVertical: 8 }}
            >
              Add
            </Button>
          </Card.Content>
        </Card>

        {/* See All Products Section */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={styles.cardTitle}>See All Products</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('SeeAllProductsScreen')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              contentStyle={{ paddingVertical: 8 }}
            >
              View
            </Button>
          </Card.Content>
        </Card>

        {/* Send Items Section */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={styles.cardTitle}>Send Items</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('SendItemsScreen')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              contentStyle={{ paddingVertical: 8 }}
            >
              Go
            </Button>
          </Card.Content>
        </Card>

        {/* Receive Items Section */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={styles.cardTitle}>Receive Items</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('ReceiveItemsScreen')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              contentStyle={{ paddingVertical: 8 }}
            >
              Go
            </Button>
          </Card.Content>
        </Card>

        {/* Transaction History Section */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={styles.cardTitle}>Transaction History</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('TransactionHistoryScreen')}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              contentStyle={{ paddingVertical: 8 }}
            >
              View
            </Button>
          </Card.Content>
        </Card>

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
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    borderRadius: 10,
  },
});

export default HomeScreen;
