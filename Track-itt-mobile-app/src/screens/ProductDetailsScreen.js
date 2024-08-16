import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, Card, useTheme, Button } from 'react-native-paper';

// Dummy data for product details
const dummyProductDetails = {
  id: '1',
  name: 'Product A',
  category: 'Category 1',
  currentStock: 100,
  price: 20,
  transferHistory: [
    {
      id: '1',
      from: 'Warehouse A',
      to: 'Inventory 1',
      quantity: 50,
      timestamp: '2024-08-10T10:00:00Z',
    },
    {
      id: '2',
      from: 'Warehouse B',
      to: 'Inventory 2',
      quantity: 50,
      timestamp: '2024-08-12T14:00:00Z',
    },
  ],
};

const ProductDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const product = route.params?.product || dummyProductDetails; // Replace with real product data

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>{product.name}</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.detailText}>Category: {product.category}</Text>
            <Text style={styles.detailText}>Current Stock: {product.currentStock}</Text>
            <Text style={styles.detailText}>Price: ${product.price}</Text>
          </Card.Content>
        </Card>

        <Text style={[styles.subTitle, { color: theme.colors.primary }]}>Transfer History</Text>
        {product.transferHistory.map((transfer) => (
          <Card key={transfer.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.detailText}>From: {transfer.from}</Text>
              <Text style={styles.detailText}>To: {transfer.to}</Text>
              <Text style={styles.detailText}>Quantity: {transfer.quantity}</Text>
              <Text style={styles.timestamp}>
                Timestamp: {new Date(transfer.timestamp).toLocaleString()}
              </Text>
            </Card.Content>
          </Card>
        ))}

        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
          Back to Products
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
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    marginTop: 16,
    borderRadius: 10,
  },
});

export default ProductDetailsScreen;