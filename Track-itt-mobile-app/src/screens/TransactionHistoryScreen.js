import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme, Card, Dialog, Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

// Dummy data for transaction history and locations
const dummyData = {
  transactionHistory: [
    {
      id: '1',
      from: 'Warehouse A',
      to: 'Inventory 1',
      productsTransferred: ['Product A', 'Product B'],
      deliveredByEmployeeId: '123456',
      receivedByEmployeeId: '654321',
      vehicleNumber: 'XYZ1234',
      status: 'Completed',
      timestamp: '2024-08-14T10:00:00Z',
      sentByMe: true,
      receivedByMe: false,
    },
    {
      id: '2',
      from: 'Warehouse B',
      to: 'Inventory 2',
      productsTransferred: ['Product C'],
      deliveredByEmployeeId: '234567',
      receivedByEmployeeId: null, // Not yet received
      vehicleNumber: 'ABC5678',
      status: 'Pending',
      timestamp: '2024-08-14T12:00:00Z',
      sentByMe: false,
      receivedByMe: true,
    },
    // Add more records as needed
  ],
  warehouses: [
    { label: 'Warehouse A', value: 'warehouseA' },
    { label: 'Warehouse B', value: 'warehouseB' },
  ],
  inventories: [
    { label: 'Inventory 1', value: 'inventory1' },
    { label: 'Inventory 2', value: 'inventory2' },
  ],
};

const TransactionHistoryScreen = () => {
  const theme = useTheme();

  const [filterFrom, setFilterFrom] = React.useState('');
  const [filterTo, setFilterTo] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterSentOrReceived, setFilterSentOrReceived] = React.useState('');
  const [employeeId, setEmployeeId] = React.useState('');
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState(''); // 'from' or 'to'

  const handleCompleteTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setDialogVisible(true);
  };

  const confirmCompleteTransaction = () => {
    if (employeeId) {
      Alert.alert('Transaction Completed', `Transaction for ${selectedTransaction.productsTransferred.join(', ')} completed successfully!`);
      setDialogVisible(false);
    } else {
      Alert.alert('Error', 'Please enter your Employee ID.');
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSelectValue = (value) => {
    if (modalType === 'from') {
      setFilterFrom(value);
    } else if (modalType === 'to') {
      setFilterTo(value);
    }
    setModalVisible(false);
  };

  const filteredTransactions = dummyData.transactionHistory.filter(transaction => {
    return (
      (filterFrom ? transaction.from.toLowerCase().includes(filterFrom.toLowerCase()) : true) &&
      (filterTo ? transaction.to.toLowerCase().includes(filterTo.toLowerCase()) : true) &&
      (filterStatus ? transaction.status.toLowerCase().includes(filterStatus.toLowerCase()) : true) &&
      (filterSentOrReceived === 'sent' ? transaction.sentByMe : true) &&
      (filterSentOrReceived === 'received' ? transaction.receivedByMe : true)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Transaction History</Text>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
            onPress={() => handleOpenModal('from')}
          >
            <Text style={styles.pickerText}>
              {filterFrom ? dummyData.warehouses.concat(dummyData.inventories).find(w => w.value === filterFrom)?.label : 'Filter From'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ButtonInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
            onPress={() => handleOpenModal('to')}
          >
            <Text style={styles.pickerText}>
              {filterTo ? dummyData.warehouses.concat(dummyData.inventories).find(i => i.value === filterTo)?.label : 'Filter To'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          label="Filter by Status"
          value={filterStatus}
          onChangeText={setFilterStatus}
          style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
          mode="outlined"
          theme={{ roundness: 10 }}
        />
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setFilterSentOrReceived(filterSentOrReceived === 'sent' ? 'received' : 'sent')}
        >
          <Text style={[styles.filterButtonText, { color: theme.colors.background }]}>
            {filterSentOrReceived === 'sent' ? 'Filter Sent By Me' : 'Filter Received By Me'}
          </Text>
        </TouchableOpacity>

        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.transactionTitle}>
                {`Transaction from ${transaction.from} to ${transaction.to}`}
              </Text>
              <Text style={styles.detailText}>
                Products Transferred: {transaction.productsTransferred.join(', ')}
              </Text>
              <Text style={styles.detailText}>
                Delivered By Employee ID: {transaction.deliveredByEmployeeId}
              </Text>
              <Text style={styles.detailText}>
                {transaction.receivedByEmployeeId ? `Received By Employee ID: ${transaction.receivedByEmployeeId}` : 'Not yet received'}
              </Text>
              <Text style={styles.detailText}>Vehicle Number: {transaction.vehicleNumber}</Text>
              <Text style={[styles.status, transaction.status === 'Completed' ? styles.completed : styles.pending]}>
                Status: {transaction.status}
              </Text>
              <Text style={styles.timestamp}>
                Timestamp: {new Date(transaction.timestamp).toLocaleString()}
              </Text>
              {transaction.receivedByMe && !transaction.receivedByEmployeeId && (
                <Button
                  mode="contained"
                  onPress={() => handleCompleteTransaction(transaction)}
                  style={[styles.completeButton, { backgroundColor: theme.colors.primary }]}
                >
                  Complete Transaction
                </Button>
              )}
            </Card.Content>
          </Card>
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
              selectedValue={modalType === 'from' ? filterFrom : filterTo}
              onValueChange={(value) => handleSelectValue(value)}
            >
              <Picker.Item label={`Select ${modalType === 'from' ? 'From Location' : 'To Location'}`} value="" />
              {dummyData.warehouses.concat(dummyData.inventories).map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
            <Button onPress={() => setModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Confirmation Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Complete Transaction</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Enter Your Employee ID"
              value={employeeId}
              onChangeText={setEmployeeId}
              style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
              mode="outlined"
              theme={{ roundness: 10 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={confirmCompleteTransaction}>Confirm</Button>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  card: {
    marginBottom: 16,
    borderRadius: 10,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 8,
    color: '#888',
  },
  input: {
    marginBottom: 16,
  },
  ButtonInput: {
    flex: 1,
    marginHorizontal: 8,
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
  filterButton: {
    marginBottom: 16,
    justifyContent: 'center',
    height: 56,
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButton: {
    marginTop: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
