import React from 'react';
import Container from '../layout/Container';
import HistoricTable from '../components/OrderTable/HistoricTable';

export default function OrdersTablePage() {
  console.log('Hola');
  return (
    <Container>
      <HistoricTable />
    </Container>
  );
}
