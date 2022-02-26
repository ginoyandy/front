import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../layout/Container';
import { Text } from '@chakra-ui/react';
import Togglable from '../layout/Togglable';
import { OrderDocument } from '../interfaces/Order';
import OrderObservation from './OrderObservation';

export default function MultipleObservations() {
  const location = useLocation();
  type locationState = {
    selectedOrders: OrderDocument[];
  };

  const { selectedOrders } = location.state as locationState;
  selectedOrders.map((o) => ({
    ...o,
    orderedDate: new Date(o.orderedDate),
    informedDate: new Date(o.informedDate),
  }));

  return (
    <>
      {selectedOrders.map((or) => (
        <Togglable key={or._id} title={or.orderNumber}>
          <OrderObservation order={or} />
        </Togglable>
      ))}
    </>
  );
}
