import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';

// Dummy data for analytics
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [30, 45, 28, 80, 99, 43],
    },
  ],
};

const inventoryData = {
  labels: ['Product A', 'Product B', 'Product C'],
  datasets: [
    {
      data: [100, 200, 150],
    },
  ],
};

const AnalyticsDashboardScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Analytics Dashboard</Text>

        <Text style={[styles.subTitle, { color: theme.colors.primary }]}>Sales Trends</Text>
        <LineChart
          data={salesData}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.background,
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            color: (opacity = 1) => theme.colors.primary,
          }}
          style={styles.chart}
        />

        <Text style={[styles.subTitle, { color: theme.colors.primary }]}>Inventory Levels</Text>
        <BarChart
          data={inventoryData}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.background,
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            color: (opacity = 1) => theme.colors.primary,
          }}
          style={styles.chart}
        />
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
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
});

export default AnalyticsDashboardScreen;
