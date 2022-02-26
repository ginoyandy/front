import React from 'react';
import Container from '../layout/Container';
import MainTable from '../components/OrderTable/MainTable';
import HistoricTable from '../components/OrderTable/HistoricTable';

export default function OrdersTablePage() {
  console.log('Hola');
  return (
    <Container>
      <HistoricTable />
    </Container>
  );
}
