import { Box, ChakraProvider } from '@chakra-ui/react';
import '@fontsource/open-sans';
import '@fontsource/open-sans-condensed';
import '@fontsource/source-sans-pro';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { OrderContextProvider } from './context/OrdersContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderObservationPage from './pages/OrderObservationPage';
import { isLogged } from './services/user.service';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <OrderContextProvider>
        <Box bg="gray.200" minHeight="100vh">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order/observe" element={<OrderObservationPage />} />
            <Route path="/login" element={<LoginPage />} />
            {isLogged() ? 'a' : 'b'}
          </Routes>
        </Box>
      </OrderContextProvider>
    </ChakraProvider>
  );
}

export default App;
