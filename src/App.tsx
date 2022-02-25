import { Box, ChakraProvider } from '@chakra-ui/react';
import '@fontsource/open-sans';
import '@fontsource/open-sans-condensed';
import '@fontsource/source-sans-pro';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { OrderContextProvider } from './context/OrdersContext';
import { UserContextProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import LoadExcelPage from './pages/LoadExcelPage';
import LoginPage from './pages/LoginPage';
import OrderObservationPage from './pages/OrderObservationPage';
import OrdersTablePage from './pages/OrdersTablePage';
import { isLogged } from './services/user.service';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <OrderContextProvider>
          <Box bg="gray.200" minHeight="100vh">
            <Navbar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/excel" element={<LoadExcelPage />} />
              <Route
                path="/orders/observe"
                element={<OrderObservationPage />}
              />
              <Route path="/orders/table" element={<OrdersTablePage />} />
              <Route path="/login" element={<LoginPage />} />
              {isLogged() ? 'a' : 'b'}
            </Routes>
          </Box>
        </OrderContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;
