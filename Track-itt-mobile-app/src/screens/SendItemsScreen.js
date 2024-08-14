import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

// Dummy data as per the backend model structure
const dummyData = {
  warehouses: [
    { label: 'Warehouse A', value: 'warehouseA' },
    { label: 'Warehouse B', value: 'warehouseB' },
  ],
  inventories: [
    { label: 'Inventory 1', value: 'inventory1' },
    { label: 'Inventory 2', value: 'inventory2' },
  ],
  products: [
    { label: 'Product A', value: 'productA' },
    { label: 'Product B', value: 'productB' },
  ],
  deliveryPartners: [
    { label: 'Partner 1', value: 'partner1' },
    { label: 'Partner 2', value: 'partner2' },
  ],
};

const SendItemsScreen = ({ navigation }) => {
  const [fromWarehouse, setFromWarehouse] = React.useState('');
  const [toInventory, setToInventory] = React.useState('');
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [deliveredByEmployeeId, setDeliveredByEmployeeId] = React.useState('');
  const [receivedByEmployeeId, setReceivedByEmployeeId] = React.useState('');
  const [vehicleNumber, setVehicleNumber] = React.useState('');
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarColor, setSnackbarColor] = React.useState('');

  // Modal state
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState(''); // 'warehouse', 'inventory', 'products'

  const theme = useTheme();

  const handleSendItems = () => {
    if (fromWarehouse && toInventory && selectedProducts.length && deliveredByEmployeeId && receivedByEmployeeId && vehicleNumber) {
      setSnackbarMessage('Items sent successfully!');
      setSnackbarColor('green');
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
        navigation.goBack();
      }, 3000);
    } else {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000);
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSelectValue = (value) => {
    if (modalType === 'warehouse') {
      setFromWarehouse(value);
    } else if (modalType === 'inventory') {
      setToInventory(value);
    } else if (modalType === 'products') {
      setSelectedProducts(value);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Send Items</Text>
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('warehouse')}
        >
          <Text style={styles.pickerText}>
            {fromWarehouse ? dummyData.warehouses.find(w => w.value === fromWarehouse)?.label : 'Select From Warehouse'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('inventory')}
        >
          <Text style={styles.pickerText}>
            {toInventory ? dummyData.inventories.find(i => i.value === toInventory)?.label : 'Select To Inventory'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('products')}
        >
          <Text style={styles.pickerText}>
            {selectedProducts.length ? `${selectedProducts.length} Product(s) Selected` : 'Select Products'}
          </Text>
        </TouchableOpacity>
        <TextInput
          label="Delivered By Employee ID"
          value={deliveredByEmployeeId}
          onChangeText={text => setDeliveredByEmployeeId(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TextInput
          label="Received By Employee ID"
          value={receivedByEmployeeId}
          onChangeText={text => setReceivedByEmployeeId(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TextInput
          label="Vehicle Number"
          value={vehicleNumber}
          onChangeText={text => setVehicleNumber(text)}
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
              selectedValue={modalType === 'warehouse' ? fromWarehouse : modalType === 'inventory' ? toInventory : selectedProducts}
              onValueChange={(value) => handleSelectValue(value)}
            >
              <Picker.Item label={`Select ${modalType === 'warehouse' ? 'Warehouse' : modalType === 'inventory' ? 'Inventory' : 'Products'}`} value="" />
              {modalType === 'warehouse' &&
                dummyData.warehouses.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              {modalType === 'inventory' &&
                dummyData.inventories.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              {modalType === 'products' &&
                dummyData.products.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
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
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
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
