import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderDocument } from '../../interfaces/Order';
import PrimaryDivider from '../../layout/PrimaryDivider';

export default function SelectionTable() {
  const [orders, setOrders] = useState([] as OrderDocument[]);
  const [checkbox, setCheckbox] = useState({} as Record<string, boolean>);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const { stateOrders } = location.state as {
      stateOrders: OrderDocument[];
    };
    console.log('State orders:', stateOrders);
    if (stateOrders && stateOrders !== undefined) {
      setOrders(stateOrders);
    } else {
      toast({
        status: 'error',
        title: 'Error',
        description: 'Error al recuperar las órdenes del documento',
      });
    }
  }, []);

  useEffect(() => {
    const dict: Record<string, boolean> = {};
    orders.forEach((o) => (dict[o._id] = false));
    setCheckbox(dict);
  }, [orders]);

  const handleCheckBoxChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setCheckbox((prev) => ({
      ...prev,
      [event.target.id]: !prev[event.target.id],
    }));
  };

  const handleNextStep = () => {
    const selectedIds = Object.entries(checkbox)
      .filter((pair) => pair[1] === true)
      .map((pair) => pair[0]);

    if (selectedIds.length === 0) {
      console.log('Entré');
      toast({
        status: 'error',
        title: 'Error',
        description: 'Debe seleccionar un pedido para poder continuar',
        isClosable: true,
        duration: 8000,
      });
    } else {
      const selectedOrders = [...orders]
        .filter((o) => selectedIds.indexOf(o._id) != -1)
        .map((o) => ({
          ...o,
          orderedDate: new Date(o.orderedDate),
          informedDate: new Date(),
        }));
      navigate('/orders/multiple-observation', { state: { selectedOrders } });
    }
  };

  return (
    <div>
      <Heading> Tabla de Pedidos</Heading>
      <PrimaryDivider />
      <Table mt={2}>
        <Thead>
          <Tr bg="primary.dark">
            <Th fontWeight={700} fontSize={18} color="#fff">
              Selecc.
            </Th>
            <Th fontWeight={700} fontSize={18} color="#fff">
              N° de solicitud
            </Th>
            <Th fontWeight={700} fontSize={18} color="#fff">
              Cliente
            </Th>
            <Th fontWeight={700} fontSize={18} color="#fff">
              Fecha
            </Th>
            <Th fontWeight={700} fontSize={18} color="#fff">
              Dirección
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {orders.map((o, i) => (
            <Tr key={o._id}>
              <Td>
                <Checkbox
                  onChange={handleCheckBoxChange}
                  id={o._id}
                  isChecked={checkbox[o._id]}
                />
              </Td>
              <Td>{o.orderNumber}</Td>
              <Td>{o.firstName}</Td>
              <Td>{JSON.stringify(new Date(o.orderedDate)).slice(1, 11)}</Td>
              <Td>{o.adress}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex direction="row" justifyContent="space-between" mt={4}>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Volver atrás
        </Button>
        <Button onClick={handleNextStep}> Procesar</Button>
      </Flex>
    </div>
  );
}
