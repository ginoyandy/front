import { ArrowBackIcon, DownloadIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, {
  ChangeEventHandler,
  FormEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { Order, OrderDocument } from '../interfaces/Order';
import { Owner, OwnerDocument } from '../interfaces/Owner';
import PrimaryDivider from '../layout/PrimaryDivider';
import { getPdfByID, putOrder } from '../services/orders.service';
import AddOwners from './AddOwners';
import DatePicker from './DatePicker/DatePicker';

export default function OrderObservation({ order }: { order: OrderDocument }) {
  // const { getOrderById } = useOrders();
  const toast = useToast();
  const [input, setInput] = useState(order as OrderDocument);
  const [updated, setUpdated] = useState(false);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    setUpdated(false);
    setInput((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleOwnersChange = (ownList: Owner[]) => {
    setUpdated(false);
    setInput((prevValue) => ({ ...prevValue, owners: ownList }));
  };

  type handleDateChangeType = ((date: Date) => unknown) &
    ((date: Date | null, event: SyntheticEvent<Event>) => void) &
    FormEventHandler<HTMLElement>;

  const handleDateChange: handleDateChangeType = (eventDate) => {
    setUpdated(false);
    setInput((prevValue) => ({
      ...prevValue,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      orderedDate: new Date(eventDate),
    }));
  };

  const handleDateChange2: handleDateChangeType = (eventDate) => {
    setUpdated(false);
    setInput((prevValue) => ({
      ...prevValue,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      informedDate: new Date(eventDate),
    }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log(input);
    putOrder(input, input._id)
      .then((res) => {
        setUpdated(true);
      })
      .catch((err: any) => {
        toast({
          status: 'error',
          description: err.message,
          isClosable: true,
          title: 'Error',
        });
      });
  };

  const getOrderPDF = async (id: string) => {
    getPdfByID(id)
      .then((res) => {
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `solicitud-${order.orderNumber}.pdf`); 
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

  const boxHeadStyle: React.CSSProperties = {
    textDecoration: 'underline',
    fontWeight: 700,
    textUnderlineOffset: 6,
    marginBottom: 12,
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* BOX No1 = VERIFICACION REGISTRAL DEL INMUEBLE */}
        <VStack
          border="1px solid #000"
          mb={2}
          paddingY={2}
          px={4}
          align="stretch"
        >
          <Text style={boxHeadStyle}>Verificación Registral de Inmuebles</Text>
          <Flex
            justifyContent="space-between"
            direction={['column', 'column', 'row']}
            columnGap={2}
            rowGap={2}
          >
            <HStack>
              {/* Input field for orderedDate - Fehcha de solicitud*/}

              <Text style={{ whiteSpace: 'nowrap' }}>Fecha de solicitud: </Text>
              <FormControl>
                <DatePicker
                  id="orderedDate"
                  selectedDate={input.orderedDate}
                  onChange={handleDateChange}
                  showPopperArrow={true}
                />
              </FormControl>
            </HStack>
            <HStack>
              <Text style={{ whiteSpace: 'nowrap' }}>Nro Solicitud: </Text>
              <Input
                id="number"
                value={input.orderNumber}
                onChange={handleInputChange}
              />
            </HStack>
          </Flex>
          <HStack>
            <Text>Banco: </Text>
            <FormControl>
              <Input
                id="bankName"
                value={input.bankName}
                onChange={handleInputChange}
              />
            </FormControl>
          </HStack>
          <HStack>
            <Text>Sucursal: </Text>
            <FormControl>
              <Input
                id="office"
                value={input.office}
                onChange={handleInputChange}
              />
            </FormControl>
          </HStack>
        </VStack>

        {/* BOX No2 = TITULAR / TITULARES */}
        <Box border="1px solid #000" mb={2} paddingY={2} px={4}>
          <Flex direction="row" justifyContent="space-between">
            <Text style={boxHeadStyle}>TITULAR / ES</Text>
          </Flex>
          <AddOwners
            owners={input.owners}
            onUpdateOwnerList={handleOwnersChange}
          />
        </Box>

        {/* BOX No3 = Domicilio */}
        <Box border="1px solid #000" mb={2} paddingY={2} px={4}>
          <Stack
            direction={['column', 'column', 'row']}
            justifyContent="space-between"
            columnGap={2}
            rowGap={2}
          >
            <VStack w={['100%', '100%', '50%']} align="stretch">
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Domicilio: </Text>
                <FormControl>
                  <Input
                    id="adress"
                    value={input.adress}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Localidad : </Text>
                <FormControl>
                  <Input
                    id="city"
                    value={input.city}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>

              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Sup. Total : </Text>
                <FormControl>
                  <Input
                    id="totalArea"
                    value={input.totalArea}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
            </VStack>

            <VStack w={['100%', '100%', '50%']} align="stretch">
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Dpto: </Text>
                <FormControl>
                  <Input
                    id="department"
                    value={input.department}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Provincia: </Text>
                <FormControl>
                  <Input
                    id="state"
                    value={input.state}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
            </VStack>
          </Stack>
        </Box>

        {/* BOX No4 = Informe de dominio */}
        <Box border="1px solid #000" mb={2} paddingY={2} px={4}>
          <Text style={boxHeadStyle}>Informe de dominio</Text>
          <HStack mb={2}>
            <Text style={{ whiteSpace: 'nowrap' }}>Matrícula: </Text>
            <FormControl>
              <Input
                id="enrollmentNumber"
                value={input.enrollmentNumber}
                onChange={handleInputChange}
                maxW="300px"
              />
            </FormControl>
          </HStack>
          <Stack direction={['column', 'column', 'row']} align={'stretch'}>
            <Box flex={1}>
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Folio: </Text>
                <FormControl>
                  <Input
                    id="folioNumber"
                    value={input.folioNumber}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
            </Box>
            <Box flex={1}>
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Tomo: </Text>
                <FormControl>
                  <Input
                    id="volumeNumer"
                    value={input.volumeNumer}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
            </Box>
            <Box flex={1}>
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Año: </Text>
                <FormControl>
                  <Input
                    id="yearNumber"
                    value={input.yearNumber}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
            </Box>
          </Stack>
        </Box>

        {/* BOX No5 = Observaciones */}
        <Box border="1px solid #000" mb={2} paddingY={2} px={4}>
          <Text style={boxHeadStyle}>Observaciones</Text>
          <FormControl>
            <Textarea
              id="observations"
              onChange={handleInputChange}
              value={input.observations}
            ></Textarea>
          </FormControl>
        </Box>

        <Box mb={2} paddingY={2} px={4}>
          <Flex
            direction={['column', 'column', 'row']}
            alignItems="stretch"
            columnGap={3}
            alignContent="center"
            justifyContent={'center'}
          >
            <Box flex={1} display="flex" flexDirection="column" rowGap={2}>
              <FormControl>
                <HStack>
                  <Text style={{ whiteSpace: 'nowrap' }}>
                    Costo del informe: ${' '}
                  </Text>
                  <Input
                    id="orderAmmount"
                    value={input.orderAmmount}
                    onChange={handleInputChange}
                  ></Input>
                </HStack>
              </FormControl>

              <FormControl
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Text style={{ whiteSpace: 'nowrap' }} me={2}>
                  Informado el día:{' '}
                </Text>
                <DatePicker
                  id="informedDate"
                  onChange={handleDateChange2}
                  selectedDate={
                    input.informedDate === undefined
                      ? new Date()
                      : input.informedDate
                  }
                />
              </FormControl>
            </Box>
            <Box flex={1}>
              <Text>Verificador: [ Aquí iria la firma ] </Text>
            </Box>
          </Flex>
        </Box>

        <PrimaryDivider />
        {/* BOX No6 = Costo y fecha */}
        <Flex direction="row" justifyContent="space-between">
          <Button variant="outline">
            <ArrowBackIcon /> Volver atrás
          </Button>
          <Button type="submit">Guardar</Button>
        </Flex>
      </form>

      {updated ? (
        <Box mt={4} display="grid" placeItems="center">
          <Button
            backgroundColor="#b30c00"
            _hover={{ bgColor: 'red' }}
            onClick={() => getOrderPDF(order._id)}
          >
            <DownloadIcon /> Obtener PDF
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}
