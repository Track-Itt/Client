import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

// Dummy data for categories and inventory locations
const dummyData = {
  categories: [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ],
  inventoryLocations: [
    { label: 'Location 1', value: 'location1' },
    { label: 'Location 2', value: 'location2' },
    { label: 'Location 3', value: 'location3' },
  ],
};

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [inventoryLocation, setInventoryLocation] = React.useState('');
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarColor, setSnackbarColor] = React.useState('');
  
  // Modal state
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState(''); // 'category' or 'location'

  const theme = useTheme();

  const handleAddProduct = () => {
    if (name && category && quantity && cost && inventoryLocation) {
      setSnackbarMessage('Product added successfully!');
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
    if (modalType === 'category') {
      setCategory(value);
    } else if (modalType === 'location') {
      setInventoryLocation(value);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Add Product</Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('category')}
        >
          <Text style={styles.pickerText}>
            {category ? dummyData.categories.find(c => c.value === category)?.label : 'Select Category'}
          </Text>
        </TouchableOpacity>
        <TextInput
          label="Quantity"
          value={quantity}
          onChangeText={text => setQuantity(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          keyboardType="numeric"
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TextInput
          label="Cost per Product"
          value={cost}
          onChangeText={text => setCost(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          keyboardType="numeric"
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('location')}
        >
          <Text style={styles.pickerText}>
            {inventoryLocation ? dummyData.inventoryLocations.find(l => l.value === inventoryLocation)?.label : 'Select Inventory Location'}
          </Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={handleAddProduct}
          style={[styles.button, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
          contentStyle={{ paddingVertical: 8 }}
        >
          Add Product
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
              selectedValue={modalType === 'category' ? category : inventoryLocation}
              onValueChange={(value) => handleSelectValue(value)}
            >
              <Picker.Item label={`Select ${modalType === 'category' ? 'Category' : 'Location'}`} value="" />
              {modalType === 'category' &&
                dummyData.categories.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              {modalType === 'location' &&
                dummyData.inventoryLocations.map((item) => (
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

export default AddProductScreen;
