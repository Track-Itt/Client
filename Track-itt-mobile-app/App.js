import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/config/theme";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SendItemsScreen from "./src/screens/SendItemsScreen";
import AddProductScreen from "./src/screens/AddProductScreen";
import SeeAllProductsScreen from "./src/screens/SeeAllProductsScreen";
import ReceiveItemsScreen from "./src/screens/ReceiveItemsScreen";
import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={() => ({
              headerTitle: "",
            })}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SendItemsScreen"
            component={SendItemsScreen}
            options={() => ({
              headerTitle: "",
            })}
          />
          <Stack.Screen
            name="AddProductScreen"
            component={AddProductScreen}
            options={() => ({
              headerTitle: "",
            })}
          />
          <Stack.Screen
            name="SeeAllProductsScreen"
            component={SeeAllProductsScreen}
            options={() => ({
              headerTitle: "",
            })}
          />
          <Stack.Screen
            name="ReceiveItemsScreen"
            component={ReceiveItemsScreen}
            options={() => ({
              headerTitle: "",
            })}
          />
          <Stack.Screen
            name="TransactionHistoryScreen"
            component={TransactionHistoryScreen}
            options={() => ({
              headerTitle: "",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
