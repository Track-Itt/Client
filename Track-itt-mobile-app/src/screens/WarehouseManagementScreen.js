import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

// Dummy data for warehouse management
const warehouseData = [
  { location: 'Warehouse 1', products: 50, lastUpdated: '2023-08-13' },
  { location: 'Warehouse 2', products: 30, lastUpdated: '2023-08-12' },
];

const WarehouseManagementScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Warehouse Management</Text>
        {warehouseData.map((warehouse, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>Location: {warehouse.location}</Text>
              <Text style={styles.text}>Products Count: {warehouse.products}</Text>
              <Text style={styles.text}>Last Updated: {warehouse.lastUpdated}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: '#1E3A8A',
  },
});

export default WarehouseManagementScreen;
