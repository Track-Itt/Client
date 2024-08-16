import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, useTheme, Snackbar } from 'react-native-paper';
import { fetchAllProductTransfers, completeProductTransfer } from '../services/api';
import { Picker } from '@react-native-picker/picker';

const ReceiveItemsScreen = () => {
  const theme = useTheme();
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [pickerType, setPickerType] = useState('');

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
  }, [selectedLocation, selectedProduct, searchEmployeeId]);

  const applyFilters = () => {
    let filtered = transfers;

    if (selectedLocation) {
      filtered = filtered.filter(
        transfer =>
          transfer.from?.location === selectedLocation || transfer.to?.location === selectedLocation
      );
    }

    if (selectedProduct) {
      const searchTxt = selectedProduct.toLowerCase();

      filtered = filtered.filter(transfer =>
        transfer.productsTransferred.some(product => product.name.toLowerCase().includes(searchTxt))
      );
    }

    if (searchEmployeeId) {
      const searchTxt = searchEmployeeId.toLowerCase();
      
      filtered = filtered.filter(
        transfer =>
          transfer.deliveredByEmployeeId === searchTxt || transfer.deliveredByEmployeeId.includes(searchTxt)
      );
    }

    setFilteredTransfers(filtered);
  };

  const handleCompleteTransfer = async () => {
    if (!employeeId || !selectedTransfer) {
      setSnackbarMessage('Please enter your Employee ID.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
      return;
    }

    try {
      setLoading(true);
      await completeProductTransfer(selectedTransfer._id, employeeId);
      setSnackbarMessage('Product transfer completed successfully!');
      setSnackbarColor('green');
      setSnackbarVisible(true);
      setTransfers(transfers.filter(t => t._id !== selectedTransfer._id));
      setFilteredTransfers(filteredTransfers.filter(t => t._id !== selectedTransfer._id));
    } catch (err) {
      console.log(err);
      setSnackbarMessage('Failed to complete product transfer.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const openPickerModal = (type) => {
    setPickerType(type);
    setPickerModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading transfers...</Text>
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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => openPickerModal('location')}
          >
            <Text style={styles.filterButtonText}>
              {selectedLocation ? `Location: ${selectedLocation}` : 'Select Location'}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Search Product"
            value={selectedProduct}
            onChangeText={setSelectedProduct}
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
          />
          <TextInput
            placeholder="Search Employee ID"
            value={searchEmployeeId}
            onChangeText={setSearchEmployeeId}
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
          />
        </View>

        {filteredTransfers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transfers available.</Text>
          </View>
        ) : (
          filteredTransfers.map((transfer) => (
            <Card key={transfer._id} style={styles.card}>
              <Card.Content>
                <Title>Transfer from {transfer.from?.location} to {transfer.to?.location}</Title>
                <Paragraph>Products Transferred:</Paragraph>
                {transfer.productsTransferred.map((product) => (
                  <Paragraph key={product._id}>{product.name} - {product.count} units</Paragraph>
                ))}
                <Paragraph>Delivered by Employee ID: {transfer.deliveredByEmployeeId}</Paragraph>
                <Paragraph>Vehicle Number: {transfer.vehicleNumber}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => {
                    setSelectedTransfer(transfer);
                    setModalVisible(true);
                  }}
                  style={styles.button}
                >
                  Confirm Receipt
                </Button>
              </Card.Actions>
            </Card>
          ))
        )}
      </ScrollView>

      {/* Modal for Picker */}
      <Modal
        visible={pickerModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPickerModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={pickerType === 'location' ? selectedLocation : ''}
              onValueChange={(itemValue) => {
                if (pickerType === 'location') setSelectedLocation(itemValue);
                setPickerModalVisible(false);
              }}
            >
              <Picker.Item label="Select Location" value="" />
              {[...new Set(transfers.map(t => t.from?.location || t.to?.location))].map(location => (
                <Picker.Item key={location} label={location} value={location} />
              ))}
            </Picker>
            <Button onPress={() => setPickerModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Modal for confirming receipt */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              label="Enter Your Employee ID"
              value={employeeId}
              onChangeText={setEmployeeId}
              style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
              mode="outlined"
              theme={{ roundness: 10 }}
            />
            <Button
              mode="contained"
              onPress={handleCompleteTransfer}
              style={[styles.modalButton, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
            >
              Confirm
            </Button>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarColor }}
      >
        {snackbarMessage}
      </Snackbar>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginRight: 8,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#000',
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  card: {
    marginBottom: 16,
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
  modalButton: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});

export default ReceiveItemsScreen;
