import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { fetchAllWarehouses, fetchAllInventories, fetchAllProducts, sendItems } from '../services/api';

const SendItemsScreen = () => {
  const theme = useTheme();
  const [fromWarehouse, setFromWarehouse] = useState('');
  const [toInventory, setToInventory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(''); // Store only one selected product
  const [deliveredByEmployeeId, setDeliveredByEmployeeId] = useState('');
  const [receivedByEmployeeId, setReceivedByEmployeeId] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('');

  // Modal state for pickers
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'fromWarehouse', 'toInventory', or 'selectedProduct'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [warehouseData, inventoryData, productData] = await Promise.all([
          fetchAllWarehouses(),
          fetchAllInventories(),
          fetchAllProducts(1, 100, '', '', ''),
        ]);
        setWarehouses(warehouseData);
        setInventories(inventoryData);
        if(productData && productData.products)
          setProducts(productData.products);
      } catch (error) {
        setSnackbarMessage(error.message);
        setSnackbarColor('red');
        setSnackbarVisible(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendItems = async () => {
    if (!fromWarehouse || !toInventory || !selectedProduct || !deliveredByEmployeeId || !receivedByEmployeeId || !vehicleNumber) {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
      return;
    }

    try {
      setLoading(true);
      await sendItems(fromWarehouse, toInventory, [selectedProduct], deliveredByEmployeeId, receivedByEmployeeId, vehicleNumber);
      setSnackbarMessage('Items sent successfully!');
      setSnackbarColor('green');
      setSnackbarVisible(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to send items.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSelectValue = (value) => {
    if (modalType === 'fromWarehouse') {
      setFromWarehouse(value);
    } else if (modalType === 'toInventory') {
      setToInventory(value);
    } else if (modalType === 'selectedProduct') {
      setSelectedProduct(value);
    }
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('fromWarehouse')}
        >
          <Text style={styles.pickerText}>
            {fromWarehouse ? warehouses.find(w => w._id === fromWarehouse)?.location : 'Select From Warehouse'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('toInventory')}
        >
          <Text style={styles.pickerText}>
            {toInventory ? inventories.find(i => i._id === toInventory)?.location : 'Select To Inventory'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('selectedProduct')}
        >
          <Text style={styles.pickerText}>
            {selectedProduct ? products.find(p => p._id === selectedProduct)?.name : 'Select Product to Transfer'}
          </Text>
        </TouchableOpacity>

        <TextInput
          label="Delivered By Employee ID"
          value={deliveredByEmployeeId}
          onChangeText={setDeliveredByEmployeeId}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />

        <TextInput
          label="Received By Employee ID"
          value={receivedByEmployeeId}
          onChangeText={setReceivedByEmployeeId}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />

        <TextInput
          label="Vehicle Number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />

        <Button
          mode="contained"
          onPress={handleSendItems}
          style={[styles.button, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
          contentStyle={{ paddingVertical: 8 }}
        >
          Send Items
        </Button>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ backgroundColor: snackbarColor }}
        >
          {snackbarMessage}
        </Snackbar>
      </ScrollView>

      {/* Modal for Picker */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={
                modalType === 'fromWarehouse' ? fromWarehouse
                : modalType === 'toInventory' ? toInventory
                : modalType === 'selectedProduct' ? selectedProduct
                : undefined
              }
              onValueChange={(value) => handleSelectValue(value)}
            >
              <Picker.Item label={`Select ${modalType === 'fromWarehouse' ? 'Warehouse' : modalType === 'toInventory' ? 'Inventory' : 'Product'}`} value="" />
              {modalType === 'fromWarehouse' && warehouses.map((item) => (
                <Picker.Item key={item._id} label={item.location} value={item._id} />
              ))}
              {modalType === 'toInventory' && inventories.map((item) => (
                <Picker.Item key={item._id} label={item.location} value={item._id} />
              ))}
              {modalType === 'selectedProduct' && products.map((item) => (
                <Picker.Item key={item._id} label={item.name} value={item._id} />
              ))}
            </Picker>
            <Button onPress={() => setModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
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
  input: {
    marginBottom: 16,
  },
  ButtonInput: {
    marginBottom: 16,
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
  button: {
    marginTop: 16,
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

export default SendItemsScreen;
