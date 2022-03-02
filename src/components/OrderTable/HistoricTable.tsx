import { DownloadIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderDocument } from '../../interfaces/Order';
import PrimaryDivider from '../../layout/PrimaryDivider';
import { getOrders, getPdfByID } from '../../services/orders.service';
import FormEventHandler from 'react';

export default function HistoricTable() {
  const [orders, setOrders] = useState([] as OrderDocument[]);
  const [showOrders, setShowOrders] = useState([] as OrderDocument[]);
  const [filterValue, setFilter] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getOrders()
      .then((ordersList) =>
        setOrders(
          ordersList.map((o) => ({
            ...o,
            orderedDate: new Date(o.orderedDate),
          })),
        ),
      )
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Error',
          description:
            err instanceof Error ? err.message : 'Error al buscar pedidos',
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      });
  }, []);

  useEffect(() => {
    console.log('Actualizando filtrados');
    setShowOrders(orders);
  }, [orders]);

  const getOrderPDF = async (id: string, orderNumber: string) => {
    getPdfByID(id)
      .then((res) => {
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `solicitud-${orderNumber}.pdf`);
        document.body.appendChild(link);
        // This download the pdf
        link.click();
      })
      .catch((err) => {
        console.log(err);
        toast({
          status: 'error',
          description: err.message,
          isClosable: true,
          title: 'Error',
        });
      });
  };

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (filterValue === '') {
      setShowOrders(orders);
      return;
    }

    setShowOrders(
      orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(filterValue.toLowerCase()) ||
          o.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
          o.adress.toLowerCase().includes(filterValue.toLowerCase()),
      ),
    );
  };

  const editOrder = (id: string) => {
    const selectedOrders = orders.filter((o) => o._id === id);
    console.log('ToEDIT:', selectedOrders);
    navigate('/orders/multiple-observation', { state: { selectedOrders } });
  };

  return (
    <div>
      <Heading> Tabla de Pedidos</Heading>
      <PrimaryDivider />
      <form onSubmit={handleSearchSubmit}>
        <FormControl>
          <InputGroup>
            <Input
              size="md"
              placeholder="Buscar pedidos..."
              value={filterValue}
              onChange={(event) => setFilter(event.target.value)}
            />
            <InputRightAddon p={0}>
              <Button
                variant="unstyled"
                type="submit"
                display="grid"
                placeItems="center"
                paddingEnd={10}
              >
                <SearchIcon />
              </Button>
            </InputRightAddon>
          </InputGroup>
        </FormControl>
      </form>

      <Box overflow="auto">
        <Table mt={2} overflow="auto">
          <Thead>
            <Tr bg="primary.dark">
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
              <Th fontWeight={700} fontSize={18} color="#fff">
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {showOrders.map((o) => (
              <Tr key={o._id}>
                <Td>{o.orderNumber}</Td>
                <Td>{o.firstName}</Td>
                <Td>{JSON.stringify(new Date(o.orderedDate)).slice(1, 11)}</Td>
                <Td>{o.adress}</Td>
                <Td>
                  <Button
                    me={2}
                    w={10}
                    h={10}
                    p={0}
                    onClick={() => editOrder(o._id)}
                  >
                    <EditIcon id={o._id} />
                  </Button>
                  <Button
                    w={10}
                    h={10}
                    p={0}
                    variant="dark"
                    onClick={() => getOrderPDF(o._id, o.orderNumber)}
                  >
                    <DownloadIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Flex direction="row" justifyContent="space-between" mt={4}></Flex>
    </div>
  );
}
