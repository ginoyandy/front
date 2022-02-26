import { Divider, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import OrderObservation from '../components/OrderObservation';
import Container from '../layout/Container';

export default function OrderObservationPage() {
  const [input, setInput] = useState();

  return (
    <Container>
      <Heading mb={1}>Observación de pedido: </Heading>
      <Divider
        borderColor="primary.light"
        borderWidth="1px"
        mb={2}
        borderRight={0}
        borderLeft={0}
      />
      <OrderObservation />
    </Container>
  );
}
