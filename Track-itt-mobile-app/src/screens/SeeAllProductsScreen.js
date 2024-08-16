import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { fetchAllProducts, fetchAllCategories, fetchAllInventories } from '../services/api';

const SeeAllProductsScreen = () => {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedInventory, setSelectedInventory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [inventoryModalVisible, setInventoryModalVisible] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [categoryData, inventoryData] = await Promise.all([
                    fetchAllCategories(),
                    fetchAllInventories(),
                ]);
                setCategories(categoryData);
                setInventories(inventoryData);
                applyFilters();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, selectedCategory, selectedInventory, currentPage]);

    const applyFilters = async () => {
        setFilterLoading(true);
        try {
            const productData = await fetchAllProducts(
                currentPage,
                itemsPerPage,
                selectedCategory,
                selectedInventory,
                searchTerm
            );
            setProducts(productData.products);
            setTotalPages(productData.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setFilterLoading(false);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading products...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.filterContainer}>
                    <TextInput
                        placeholder="Search by name"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        style={[styles.input, { backgroundColor: theme.colors.surface }]}
                    />
                    <TouchableOpacity
                        style={[styles.filterButton, { backgroundColor: theme.colors.surface }]}
                        onPress={() => setCategoryModalVisible(true)}
                    >
                        <Text>{selectedCategory ? categories.find(c => c._id === selectedCategory)?.name : 'Select Category'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, { backgroundColor: theme.colors.surface }]}
                        onPress={() => setInventoryModalVisible(true)}
                    >
                        <Text>{selectedInventory ? inventories.find(i => i._id === selectedInventory)?.location : 'Select Inventory'}</Text>
                    </TouchableOpacity>
                </View>

                {filterLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={styles.loadingText}>Applying filters...</Text>
                    </View>
                ) : (
                    <>
                        {products.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No products available.</Text>
                            </View>
                        ) : (
                            products.map((product) => (
                                <Card key={product._id} style={styles.card}>
                                    <Card.Content>
                                        <Title>{product.name}</Title>
                                        <Paragraph>Category: {product.productCategory ? product.productCategory.name : 'Unknown'}</Paragraph>
                                        <Paragraph>Count: {product.count}</Paragraph>
                                        <Paragraph>Cost: ${product.cost}</Paragraph>
                                        <Paragraph>Inventory: {product.inventory ? product.inventory.location : 'Unknown'}</Paragraph>
                                    </Card.Content>
                                </Card>
                            ))
                        )}
                    </>
                )}

                <View style={styles.paginationContainer}>
                    <Button onPress={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
                    <Button onPress={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </View>

                {/* Category Picker Modal */}
                <Modal
                    visible={categoryModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setCategoryModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue) => {
                                    setSelectedCategory(itemValue);
                                    setCurrentPage(1);
                                    setCategoryModalVisible(false);
                                }}
                            >
                                <Picker.Item label="All Categories" value="" />
                                {categories.map(category => (
                                    <Picker.Item key={category._id} label={category.name} value={category._id} />
                                ))}
                            </Picker>
                            <Button onPress={() => setCategoryModalVisible(false)}>Close</Button>
                        </View>
                    </View>
                </Modal>

                {/* Inventory Picker Modal */}
                <Modal
                    visible={inventoryModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setInventoryModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Picker
                                selectedValue={selectedInventory}
                                onValueChange={(itemValue) => {
                                    setSelectedInventory(itemValue);
                                    setCurrentPage(1);
                                    setInventoryModalVisible(false);
                                }}
                            >
                                <Picker.Item label="All Inventories" value="" />
                                {inventories.map(inventory => (
                                    <Picker.Item key={inventory._id} label={inventory.location} value={inventory._id} />
                                ))}
                            </Picker>
                            <Button onPress={() => setInventoryModalVisible(false)}>Close</Button>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
    },
    filterButton: {
        flex: 1,
        marginLeft: 8,
        justifyContent: 'center',
        height: 56,
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    pageText: {
        fontSize: 16,
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
