import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { fetchAllProductTransfers } from '../services/api';

const TransactionHistoryScreen = () => {
  const theme = useTheme();
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [selectedFromLocation, setSelectedFromLocation] = useState('');
  const [selectedToLocation, setSelectedToLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState(''); // 'from' or 'to'

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await fetchAllProductTransfers();
        setTransfers(data);
        setFilteredTransfers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, receiverId, senderId, selectedFromLocation, selectedToLocation]);

  const applyFilters = () => {
    let filtered = transfers;

    if (searchTerm) {
      filtered = filtered.filter(transfer =>
        transfer.productsTransferred.some(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (receiverId) {
      filtered = filtered.filter(transfer => transfer.receivedByEmployeeId.includes(receiverId));
    }

    if (senderId) {
      filtered = filtered.filter(transfer => transfer.deliveredByEmployeeId.includes(senderId));
    }

    if (selectedFromLocation) {
      filtered = filtered.filter(transfer => transfer.from?.location === selectedFromLocation);
    }

    if (selectedToLocation) {
      filtered = filtered.filter(transfer => transfer.to?.location === selectedToLocation);
    }

    setFilteredTransfers(filtered);
  };

  const handleFilterModal = (type) => {
    setFilterType(type);
    setModalVisible(true);
  };

  const renderPickerOptions = () => {
    const locations = Array.from(new Set(transfers.map(transfer => transfer[filterType]?.location)));

    return locations.map(location => (
      <Picker.Item key={location} label={location} value={location} />
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading transactions...</Text>
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
        <View style={styles.filterContainer}>
          <TextInput
            placeholder="Search by product name"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
          />
          <TextInput
            placeholder="Filter by Receiver ID"
            value={receiverId}
            onChangeText={setReceiverId}
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
          />
          <TextInput
            placeholder="Filter by Sender ID"
            value={senderId}
            onChangeText={setSenderId}
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
          />
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
            onPress={() => handleFilterModal('from')}
          >
            <Text style={styles.pickerText}>
              {selectedFromLocation ? selectedFromLocation : 'Filter by From Location'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
            onPress={() => handleFilterModal('to')}
          >
            <Text style={styles.pickerText}>
              {selectedToLocation ? selectedToLocation : 'Filter by To Location'}
            </Text>
          </TouchableOpacity>
        </View>

        {filteredTransfers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions match the filters.</Text>
          </View>
        ) : (
          filteredTransfers.map((transfer) => (
            <Card key={transfer._id} style={styles.card}>
              <Card.Content>
                <Title>Transaction ID: {transfer._id}</Title>
                <Paragraph>Transfer from: {transfer.from?.location} to {transfer.to?.location}</Paragraph>
                <Paragraph>Products Transferred:</Paragraph>
                {transfer.productsTransferred.map((product) => (
                  <Paragraph key={product._id}>
                    {product.name} - {product.count} units
                  </Paragraph>
                ))}
                <Paragraph>Delivered by Employee ID: {transfer.deliveredByEmployeeId}</Paragraph>
                <Paragraph>Received by Employee ID: {transfer.receivedByEmployeeId}</Paragraph>
                <Paragraph>Vehicle Number: {transfer.vehicleNumber}</Paragraph>
              </Card.Content>
            </Card>
          ))
        )}

        {/* Modal for Location Filters */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={filterType === 'from' ? selectedFromLocation : selectedToLocation}
                onValueChange={(itemValue) => {
                  if (filterType === 'from') {
                    setSelectedFromLocation(itemValue);
                  } else {
                    setSelectedToLocation(itemValue);
                  }
                  setModalVisible(false);
                }}
              >
                <Picker.Item label="Select Location" value="" />
                {renderPickerOptions()}
              </Picker>
              <Button onPress={() => setModalVisible(false)}>Close</Button>
            </View>
          </View>
        </Modal>
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
  filterContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  filterButton: {
    marginBottom: 8,
    justifyContent: 'center',
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  pickerText: {
    fontSize: 16,
    color: '#000',
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
});

export default TransactionHistoryScreen;
