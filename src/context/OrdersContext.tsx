import React, { useState } from 'react';
import { Order } from '../interfaces/Order';

type OrderContextType = {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
};

const OrderContext = React.createContext({} as OrderContextType);

type props = {
  children: JSX.Element | JSX.Element[];
};

export function OrderContextProvider({ children }: props) {
  const [orders, setOrders] = useState([] as Order[]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
