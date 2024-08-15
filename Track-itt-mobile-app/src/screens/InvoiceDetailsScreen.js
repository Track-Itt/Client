import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

// Dummy data for invoice details
const invoiceData = {
  name: 'Invoice #12345',
  email: 'customer@example.com',
  inventory: 'Inventory 1',
  products: [
    { name: 'Product A', quantity: 10, cost: 500 },
    { name: 'Product B', quantity: 5, cost: 250 },
  ],
  totalCost: 750,
  date: '2023-08-14',
};

const InvoiceDetailsScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={[styles.title, { color: theme.colors.primary }]}>{invoiceData.name}</Text>
            <Text style={styles.text}>Email: {invoiceData.email}</Text>
            <Text style={styles.text}>Inventory: {invoiceData.inventory}</Text>
            <Text style={styles.text}>Date: {invoiceData.date}</Text>
            <Text style={styles.subTitle}>Products:</Text>
            {invoiceData.products.map((product, index) => (
              <Text key={index} style={styles.text}>
                {product.name} - Quantity: {product.quantity} - Cost: ${product.cost}
              </Text>
            ))}
            <Text style={styles.text}>Total Cost: ${invoiceData.totalCost}</Text>
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
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: '#1E3A8A',
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default InvoiceDetailsScreen;
