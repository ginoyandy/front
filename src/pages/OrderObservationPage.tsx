import { Heading } from '@chakra-ui/react';
import React from 'react';
import OrderObservation from '../components/OrderObservation';
import Container from '../layout/Container';
import PrimaryDivider from '../layout/PrimaryDivider';

export default function OrderObservationPage() {
  return (
    <Container>
      <Heading mb={1}>Observación de pedido: </Heading>
      <PrimaryDivider />
      <OrderObservation />
    </Container>
  );
}
