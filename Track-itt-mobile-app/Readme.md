# 🚀 **Track-itt Mobile App Frontend**

Track-itt is a cutting-edge mobile application designed to revolutionize real-time inventory and yard management. Built using React Native (Expo), the app is equipped with features that simplify product management, streamline item transfers, provide insightful analytics, and ensure seamless user experience through intuitive interfaces.

## **📚 Idea Description**

In today’s fast-paced world, managing inventory efficiently is crucial for businesses of all sizes. Track-itt aims to address the challenges faced by warehouse managers, logistics teams, and inventory handlers by providing a mobile solution that keeps track of products, manages transfers between warehouses and inventories, and offers real-time analytics for informed decision-making.

## **💡 Full Idea Explanation**

Track-itt is not just another inventory management tool. It is designed to bring efficiency and accuracy to the forefront by leveraging the power of mobile technology. Here’s how:

1. **User Authentication**:
    - **Sign Up & Log In**: Secure and easy-to-use authentication allows users to quickly access the app.
    - **JWT-Based Authentication**: Ensures secure sessions and data protection.

2. **Real-time Inventory Management**:
    - **Add Products**: Users can add new products to their inventory, specifying details like category, quantity, cost, and location.
    - **View Products**: Easily browse all products with advanced filters for categories, locations, and search functionalities.

3. **Seamless Product Transfers**:
    - **Send Items**: Transfer products between warehouses and inventories. Track the entire transfer process with detailed records.
    - **Receive Items**: Confirm receipt of products at their destination, ensuring accountability and accuracy.

4. **Detailed Transaction History**:
    - **Transaction Records**: Keep a comprehensive log of all transfers, complete with filters for easy navigation and review.

5. **Insightful Analytics Dashboard**:
    - **Charts & Graphs**: Visualize inventory data with pie charts, line charts, and tables, helping users make data-driven decisions.
    - **Top Categories & Inventories**: Identify which categories are performing well and which inventories are most active.

6. **User Profile Management**:
    - **Profile View**: Access user details such as name, email, and employee ID.
    - **Logout**: Securely log out of the application with a smooth transition and confirmation prompt.

7. **Smooth User Experience**:
    - **Responsive Design**: The app is fully responsive, ensuring a smooth experience across different devices.
    - **Interactive UI**: With components like modals, pickers, and scrollable views, users can interact with the app effortlessly.

## **🔧 Installation**

### **1. Clone the Repository**:

```bash
git clone https://github.com/Track-Itt/Client.git
cd Track-itt-mobile-app
```

### **2. Install Dependencies**:

Make sure you have Node.js installed. Then, install the project dependencies:

```bash
npm install
```

### **3. Install Expo CLI**:

If you don’t have Expo CLI installed globally, install it:

```bash
npm install -g expo-cli
```

### **4. Create a `.env` File**:

In the root of your project, create a `.env` file and add the following:

```env
EXPO_PUBLIC_API_BASE_URL=http://your_backend_url:5000
```

Replace `your_backend_url` with the actual backend URL.

## **💻 Running the Application**

### **1. Start the Expo Server**:

```bash
expo start
```

### **2. Run on Android/iOS Emulator or Physical Device**:
- Scan the QR code using the Expo Go app.
- Or press `a` to open the Android emulator or `i` for the iOS simulator.

## **📂 Folder Structure**

```
track-itt-frontend/
├── assets/                     # Assets such as images, icons, animations
├── src/                        # React Native frontend source code
│   ├── components/             # Reusable UI components
│   ├── screens/                # Screen components for different views
│   ├── services/               # API services (API calls, authentication)
│   ├── navigation/             # Navigation setup (React Navigation)
│   ├── config/                 # Configuration files (themes, constants)
│   └── .env                    # Environment variables for frontend
├── .gitignore                  # Ignored files in Git
├── README.md                   # Project documentation
├── App.js                      # Entry point for the React Native app
└── package.json                # NPM dependencies and scripts for the frontend
```

## **📝 License**

This project is licensed under the MIT License - see the LICENSE file for details.

## **🙌 Contributing**

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#).

## **📧 Contact**

If you have any questions or feedback, please feel free to reach out.

---
