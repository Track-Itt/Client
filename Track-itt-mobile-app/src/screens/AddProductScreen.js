import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, useTheme, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import api, { addProduct, fetchAllCategories, fetchAllInventories } from '../services/api';

const AddProductScreen = () => {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [inventoryLocation, setInventoryLocation] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [inventories, setInventories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [addingProduct, setAddingProduct] = React.useState(false); // State for adding product loading indicator
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarColor, setSnackbarColor] = React.useState('');
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState('');

  const theme = useTheme();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, inventoriesData] = await Promise.all([
          fetchAllCategories(),
          fetchAllInventories(),
        ]);

        if (categoriesData.length === 0 || inventoriesData.length === 0) {
          setSnackbarMessage('No categories or inventories available.');
          setSnackbarColor('red');
          setSnackbarVisible(true);
          setTimeout(() => {
            setSnackbarVisible(false);
          }, 3000);
        }

        setCategories(categoriesData);
        setInventories(inventoriesData);
      } catch (error) {
        setSnackbarMessage('Error fetching data. Please try again.');
        setSnackbarColor('red');
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async () => {
    if (name && category && quantity && cost && inventoryLocation) {
      setAddingProduct(true);
      try {
        await addProduct(name, quantity, cost, category, inventoryLocation);
        setSnackbarMessage('Product added successfully!');
        setSnackbarColor('green');
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
        setName('');
        setCategory('');
        setQuantity('');
        setCost('');
        setInventoryLocation('');
      } catch (error) {
        setSnackbarMessage('Error adding product. Please try again.');
        setSnackbarColor('red');
        setSnackbarVisible(true);
        setTimeout(() => {
          setSnackbarVisible(false);
        }, 3000);
      } finally {
        setAddingProduct(false);
      }
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

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

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
            {category ? categories.find(c => c._id === category)?.name : 'Select Category'}
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
            {inventoryLocation ? inventories.find(l => l._id === inventoryLocation)?.location : 'Select Inventory Location'}
          </Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={handleAddProduct}
          style={[styles.button, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
          contentStyle={{ paddingVertical: 8 }}
          disabled={addingProduct} // Disable the button while loading
        >
          {addingProduct ? <ActivityIndicator size="small" color="#FFF" /> : 'Add Product'}
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
                categories.map((item) => (
                  <Picker.Item key={item._id} label={item.name} value={item._id} />
                ))}
              {modalType === 'location' &&
                inventories.map((item) => (
                  <Picker.Item key={item._id} label={item.location} value={item._id} />
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddProductScreen;
