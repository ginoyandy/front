import { useToast } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import OrderContext from '../context/OrdersContext';
import { Order } from '../interfaces/Order';
import { searchOrderById, getOrders } from '../services/orders.service';

export const useOrders = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const toast = useToast();

  useEffect(() => {
    getOrders()
      .then((ordersResult) => setOrders(ordersResult))
      .catch((err) => {
        toast({
          title: 'Error',
          description: err instanceof Error ? err.message : null,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setOrders([]);
      });
  });

  const removeOrderById = (id: string): void => {
    setOrders((prevValue: Order[]) => prevValue.filter((c) => c.id !== id));
  };

  const getOrderById = (id: string): Order | null => {
    const searchedIndex = orders.findIndex((c: Order) => c.id === id);
    let searchedOrder = searchedIndex !== -1 ? orders[searchedIndex] : null;
    // Thenm make an API Call to se if the order exits
    if (searchedOrder != null) return searchedOrder;
    searchOrderById(id)
      .then((result) => (searchedOrder = result))
      .catch((error) => console.log(error));

    return searchedOrder;
  };

  return {
    orders,
    setOrders,
    removeOrderById,
    getOrderById,
  };
};
