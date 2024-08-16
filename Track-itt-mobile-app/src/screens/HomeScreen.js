// src/screens/HomeScreen.js
import * as React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, Card, useTheme } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Home
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("AddProductScreen")}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardText}>Add Product</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SeeAllProductsScreen")}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardText}>See All Products</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SendItemsScreen")}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardText}>Send Items</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ReceiveItemsScreen")}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardText}>Receive Items</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("TransactionHistoryScreen")}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardText}>Transaction History</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  cardText: {
    fontSize: 18,
    color: "#1E3A8A",
  },
});

export default HomeScreen;
