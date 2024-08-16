import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Dimensions, SafeAreaView } from 'react-native';
import { Card, Title, useTheme, DataTable, Button } from 'react-native-paper';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { fetchPieChartData, fetchLineChartData, fetchInvoicesTableData } from '../services/api';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const theme = useTheme();
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [invoicesTableData, setInvoicesTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pieData, lineData, invoiceData] = await Promise.all([
          fetchPieChartData(),
          fetchLineChartData(),
          fetchInvoicesTableData(currentPage, 10), // Fetch the first page with 10 items per page
        ]);

        setPieChartData(pieData.map(item => ({
          name: item.name,
          population: item.total,
          color: getRandomColor(),
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        })));

        setLineChartData({
          labels: lineData.map(item => item.location),
          datasets: [
            {
              data: lineData.map(item => item.data.reduce((sum, category) => sum + category.sales, 0)),
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            },
          ],
        });

        setInvoicesTableData(invoiceData.invoices);
        setTotalPages(invoiceData.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Category Spendings (Top 5)</Title>
            <ScrollView horizontal>
              <PieChart
                data={pieChartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#eff3ff',
                  backgroundGradientTo: '#efefef',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </ScrollView>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Sales by Inventory</Title>
            <ScrollView horizontal>
              <LineChart
                data={lineChartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </ScrollView>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Invoices Table</Title>
            <ScrollView horizontal>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title>Email</DataTable.Title>
                  <DataTable.Title numeric>Cost</DataTable.Title>
                  <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>

                {invoicesTableData.map((invoice, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{invoice.name}</DataTable.Cell>
                    <DataTable.Cell>{invoice.email}</DataTable.Cell>
                    <DataTable.Cell numeric>${invoice.cost}</DataTable.Cell>
                    <DataTable.Cell>{invoice.date}</DataTable.Cell>
                  </DataTable.Row>
                ))}

                <DataTable.Pagination
                  page={currentPage - 1}
                  numberOfPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page + 1)}
                  label={`Page ${currentPage} of ${totalPages}`}
                  style={styles.pagination}
                />
              </DataTable>
            </ScrollView>
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
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
