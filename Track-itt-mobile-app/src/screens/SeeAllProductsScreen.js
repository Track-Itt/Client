import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { useQuery } from 'react-query';
import { fetchProducts } from '../services/api';

const SeeAllProductsScreen = () => {
  const theme = useTheme();

  const { data, error, isLoading } = useQuery('products', fetchProducts);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loadingIndicator} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>Failed to load products.</Text>
      </SafeAreaView>
    );
  }

  if (data.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.noDataText}>No products available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {data.map((product) => (
          <Card key={product._id} style={styles.card}>
            <Card.Content>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.text}>Category: {product.productCategory.name}</Text>
              <Text style={styles.text}>Count: {product.count}</Text>
              <Text style={styles.text}>Cost: ${product.cost}</Text>
              <Text style={styles.text}>Location: {product.inventory.location}</Text>
            </Card.Content>
          </Card>
        ))}
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
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#1E3A8A',
  },
  loadingIndicator: {
    marginTop: '50%',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: '50%',
  },
  noDataText: {
    fontSize: 18,
    color: '#1E3A8A',
    textAlign: 'center',
    marginTop: '50%',
  },
});

export default SeeAllProductsScreen;
