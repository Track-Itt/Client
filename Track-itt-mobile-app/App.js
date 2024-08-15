import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "./src/config/theme";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AddProductScreen from "./src/screens/AddProductScreen";
import SeeAllProductsScreen from "./src/screens/SeeAllProductsScreen";
import SendItemsScreen from "./src/screens/SendItemsScreen";
import ReceiveItemsScreen from "./src/screens/ReceiveItemsScreen";
import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import AnalyticsDashboardScreen from "./src/screens/AnalyticsDashboardScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";

const queryClient = new QueryClient();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Analytics") {
            iconName = "chart-bar";
          } else if (route.name === "Profile") {
            iconName = "account";
          }

          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsDashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                headerBackTitle: "Back to Login",
              })}
            />
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddProductScreen"
              component={AddProductScreen}
              options={{ headerTitle: "Add Product" }}
            />
            <Stack.Screen
              name="SeeAllProductsScreen"
              component={SeeAllProductsScreen}
              options={{ headerTitle: "All Products" }}
            />
            <Stack.Screen
              name="SendItemsScreen"
              component={SendItemsScreen}
              options={{ headerTitle: "Send Items" }}
            />
            <Stack.Screen
              name="ReceiveItemsScreen"
              component={ReceiveItemsScreen}
              options={{ headerTitle: "Receive Items" }}
            />
            <Stack.Screen
              name="TransactionHistoryScreen"
              component={TransactionHistoryScreen}
              options={{ headerTitle: "Transaction History" }}
            />
            <Stack.Screen
              name="ProductDetailsScreen"
              component={ProductDetailsScreen}
              options={{ headerTitle: "Product Details" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
