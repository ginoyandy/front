import { Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import OrderObservation from '../components/OrderObservation';
import Container from '../layout/Container';

export default function OrderObservationPage() {
  const [input, setInput] = useState();

  return (
    <Container>
      <Heading mb={4}>Observación de pedido: </Heading>
      <OrderObservation />
    </Container>
  );
}
