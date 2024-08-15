import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Button } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

// Dummy data for bulk operations
const bulkOperationsData = [
  { operation: 'Add Multiple Products', description: 'Add multiple products to inventory at once.' },
  { operation: 'Update Product Prices', description: 'Bulk update prices for selected products.' },
  { operation: 'Transfer Products in Bulk', description: 'Transfer a batch of products between warehouses and inventories.' },
];

const BulkOperationsScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Bulk Operations</Text>
        {bulkOperationsData.map((operation, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>{operation.operation}</Text>
              <Text style={styles.subText}>{operation.description}</Text>
              <Button
                title="Perform Operation"
                onPress={() => alert(`Performing: ${operation.operation}`)}
                color={theme.colors.primary}
              />
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
  subText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#3B82F6',
  },
});

export default BulkOperationsScreen;
