import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

// Dummy data for products, categories, and inventory locations
const dummyData = {
  products: [
    { id: 1, name: 'Product A', category: 'category1', location: 'location1' },
    { id: 2, name: 'Product B', category: 'category2', location: 'location2' },
    { id: 3, name: 'Product C', category: 'category3', location: 'location3' },
  ],
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

const SeeAllProductsScreen = () => {
  const [filterName, setFilterName] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');
  const [filterLocation, setFilterLocation] = React.useState('');
  
  // Modal state
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState(''); // 'category' or 'location'

  const theme = useTheme();

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSelectValue = (value) => {
    if (modalType === 'category') {
      setFilterCategory(value);
    } else if (modalType === 'location') {
      setFilterLocation(value);
    }
    setModalVisible(false);
  };

  const filteredProducts = dummyData.products.filter(product => {
    return (
      (filterName ? product.name.toLowerCase().includes(filterName.toLowerCase()) : true) &&
      (filterCategory ? product.category === filterCategory : true) &&
      (filterLocation ? product.location === filterLocation : true)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>All Products</Text>
        <TextInput
          label="Filter by Name"
          value={filterName}
          onChangeText={text => setFilterName(text)}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('category')}
        >
          <Text style={styles.pickerText}>
            {filterCategory ? dummyData.categories.find(c => c.value === filterCategory)?.label : 'Filter by Category'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          onPress={() => handleOpenModal('location')}
        >
          <Text style={styles.pickerText}>
            {filterLocation ? dummyData.inventoryLocations.find(l => l.value === filterLocation)?.label : 'Filter by Location'}
          </Text>
        </TouchableOpacity>

        {filteredProducts.map(product => (
          <View key={product.id} style={[styles.productCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text>Category: {dummyData.categories.find(c => c.value === product.category)?.label}</Text>
            <Text>Location: {dummyData.inventoryLocations.find(l => l.value === product.location)?.label}</Text>
          </View>
        ))}
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
              selectedValue={modalType === 'category' ? filterCategory : filterLocation}
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
  productCard: {
    marginBottom: 16,
    borderRadius: 10,
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default SeeAllProductsScreen;
