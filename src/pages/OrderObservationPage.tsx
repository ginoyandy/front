import React from 'react';
import Container from '../layout/Container';
import OrderObservation from '../components/OrderObservation';
import { useState } from 'react';
import { Heading } from '@chakra-ui/react';

export default function OrderObservationPage() {
  const [input, setInput] = useState();

  return (
    <Container>
      <Heading mb={4}>Observación de pedido: </Heading>
      <OrderObservation />
    </Container>
  );
}
