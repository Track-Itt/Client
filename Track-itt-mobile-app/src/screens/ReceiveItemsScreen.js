import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme, Snackbar } from 'react-native-paper';

// Dummy data as per the backend model structure
const dummyData = {
  transferRecords: [
    {
      id: '1',
      from: 'Warehouse A',
      to: 'Inventory 1',
      productsTransferred: ['Product A', 'Product B'],
      deliveredByEmployeeId: '123456',
      vehicleNumber: 'XYZ1234',
    },
    // Add more records as needed
  ],
};

const ReceiveItemsScreen = ({ navigation }) => {
  const [receivedByEmployeeId, setReceivedByEmployeeId] = React.useState('');
  const [transferRecord, setTransferRecord] = React.useState(null);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarColor, setSnackbarColor] = React.useState('');

  const theme = useTheme();

  const handleRetrieveTransferDetails = () => {
    // For now, we'll simulate fetching a transfer record
    const record = dummyData.transferRecords[0]; // Fetch the first record for demo purposes
    setTransferRecord(record);
  };

  const handleCompleteTransaction = () => {
    if (receivedByEmployeeId) {
      setSnackbarMessage('Transaction completed successfully!');
      setSnackbarColor('green');
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
        navigation.goBack();
      }, 3000);
    } else {
      setSnackbarMessage('Please fill out the Employee ID.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Receive Items</Text>
        <Button
          mode="contained"
          onPress={handleRetrieveTransferDetails}
          style={[styles.button, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
          contentStyle={{ paddingVertical: 8 }}
        >
          Retrieve Transfer Details
        </Button>

        {transferRecord && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>From: {transferRecord.from}</Text>
            <Text style={styles.detailText}>To: {transferRecord.to}</Text>
            <Text style={styles.detailText}>Products:</Text>
            {transferRecord.productsTransferred.map((product, index) => (
              <Text key={index} style={styles.productText}>{product}</Text>
            ))}
            <Text style={styles.detailText}>Delivered By Employee ID: {transferRecord.deliveredByEmployeeId}</Text>
            <Text style={styles.detailText}>Vehicle Number: {transferRecord.vehicleNumber}</Text>
          </View>
        )}

        {transferRecord && (
          <TextInput
            label="Received By Employee ID"
            value={receivedByEmployeeId}
            onChangeText={text => setReceivedByEmployeeId(text)}
            style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }]}
            mode="outlined"
            theme={{ roundness: 10 }}
          />
        )}

        {transferRecord && (
          <Button
            mode="contained"
            onPress={handleCompleteTransaction}
            style={[styles.button, { backgroundColor: theme.colors.primary, borderRadius: 10 }]}
            contentStyle={{ paddingVertical: 8 }}
          >
            Complete Transaction
          </Button>
        )}

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ backgroundColor: snackbarColor }}
        >
          {snackbarMessage}
        </Snackbar>
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
  detailsContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  productText: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default ReceiveItemsScreen;
