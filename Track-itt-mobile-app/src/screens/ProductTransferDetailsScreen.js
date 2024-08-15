import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

// Dummy data for product transfer details
const transferData = {
  from: 'Warehouse 1',
  to: 'Inventory 2',
  products: [
    { name: 'Product A', quantity: 10 },
    { name: 'Product B', quantity: 5 },
  ],
  deliveredBy: 'EMP123456',
  receivedBy: 'EMP654321',
  vehicleNumber: 'XYZ1234',
  date: '2023-08-13',
};

const ProductTransferDetailsScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={[styles.title, { color: theme.colors.primary }]}>Product Transfer Details</Text>
            <Text style={styles.text}>From: {transferData.from}</Text>
            <Text style={styles.text}>To: {transferData.to}</Text>
            <Text style={styles.text}>Delivered By: {transferData.deliveredBy}</Text>
            <Text style={styles.text}>Received By: {transferData.receivedBy}</Text>
            <Text style={styles.text}>Vehicle Number: {transferData.vehicleNumber}</Text>
            <Text style={styles.text}>Date: {transferData.date}</Text>
            <Text style={styles.subTitle}>Products Transferred:</Text>
            {transferData.products.map((product, index) => (
              <Text key={index} style={styles.text}>
                {product.name} - Quantity: {product.quantity}
              </Text>
            ))}
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

export default ProductTransferDetailsScreen;
