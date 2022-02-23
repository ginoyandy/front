import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, {
  ChangeEventHandler,
  FormEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { Order } from '../interfaces/Order';
import DatePicker from './DatePicker/DatePicker';

export default function OrderObservation() {
  // const { getOrderById } = useOrders();
  const [input, setInput] = useState({
    orderedDate: new Date(),
    number: '',
    owners: [],
    adress: '',
    office: '',
    city: '',
    department: '',
    state: '',
    enrollmentNumber: 0,
    folioNumber: 0,
    volumeNumer: 0,
    yearNumber: 0,
    observations: '',
    orderAmmount: 0,
    informedDate: new Date(),
    totalArea: 0,
    bankName: ''
  } as Order);

  useEffect(() => {
    setInput({
      orderedDate: new Date(),
      number: '3123213KKKKKKKKKKKK',
      owners: [
        {
          firstName: 'Gino',
          lastName: 'Massei',
          dni: '418789970',
        },
        {
          firstName: 'Andres',
          lastName: 'Bardawngi',
          dni: '42342344',
        },
      ],
      office: '300 - ALVEAR',
      adress: 'Dean Funes 923',
      city: 'Oncativo',
      department: 'Rio 2',
      state: 'Cordoba',
      enrollmentNumber: 3213,
      folioNumber: 4,
      volumeNumer: 5,
      yearNumber: 2021,
      observations: 'Casa Papa',
      orderAmmount: 321312,
      informedDate: new Date(),
      totalArea: 123123,
      bankName: 'Banco Macro'
    });
    console.log('Init');
  }, []);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    setInput((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
    //console.log(input);
  };

  const handleDateChange: ((date: Date) => unknown) &
    ((date: Date | null, event: SyntheticEvent<Event>) => void) &
    FormEventHandler<HTMLElement> = (eventDate) => {
    setInput((prevValue) => ({
      ...prevValue,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      orderedDate: new Date(eventDate),
    }));
    console.log(input);
  };

  const handleDateChange2: ((date: Date) => unknown) &
    ((date: Date | null, event: SyntheticEvent<Event>) => void) &
    FormEventHandler<HTMLElement> = (eventDate) => {
    setInput((prevValue) => ({
      ...prevValue,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      informedDate: new Date(eventDate),
    }));
    console.log(input);
  };

  const boxHeadStyle: React.CSSProperties = {
    textDecoration: 'underline',
    fontWeight: 700,
    textUnderlineOffset: 6,
    marginBottom: 12,
  };

  return (
    <div>
      <form>
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
                {input.orderedDate ? (
                  <DatePicker
                    id="orderedDate"
                    selectedDate={input.orderedDate}
                    onChange={handleDateChange}
                    showPopperArrow={true}
                  />
                ) : (
                  <></>
                )}
              </FormControl>
            </HStack>
            <HStack>
              <Text style={{ whiteSpace: 'nowrap' }}>Nro Solicitud: </Text>
              <Input
                id="number"
                value={input.number}
                onChange={handleInputChange}
              />
            </HStack>
          </Flex>
          <HStack>
            <Text>Banco: </Text>
            <FormControl>
              <Input id="bankName" value={input.bankName} onChange={handleInputChange} />
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
            <Text
              style={{ ...boxHeadStyle, textDecoration: 'none' }}
              ms={32}
              me={16}
            >
              DNI / CUIT:
            </Text>
          </Flex>

          {input.owners !== [] ? (
            input.owners.map((owner) => (
              <Flex
                direction="row"
                key={owner.dni}
                justifyContent="space-between"
                ms={32}
                me={16}
              >
                <Text>{`${owner.firstName} ${owner.lastName}`}</Text>
                <Text>{owner.dni}</Text>
              </Flex>
            ))
          ) : (
            <></>
          )}
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
          <Text>Matricula</Text>
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
                  selectedDate={input.informedDate}
                />
              </FormControl>
            </Box>
            <Box flex={1}>
              <Text>Verificador: [ Aquí iria la firma ] </Text>
            </Box>
          </Flex>
        </Box>

        <Divider mb={4} />
        {/* BOX No6 = Costo y fecha */}
        <Flex direction="row" justifyContent="space-between">
          <Button variant="outline">
            <ArrowBackIcon /> Volver atrás
          </Button>
          <Button>Guardar</Button>
        </Flex>

        {/* Input field for number */}
        {/* Input field for owners */}
        {/* Input field for adress */}
        {/* Input field for city */}
        {/* Input field for department */}
        {/* Input field for state */}
        {/* Input field for enrollmentNumber */}
        {/* Input field for folioNumber */}
        {/* Input field for volumeNumer */}
        {/* Input field for yearNumber */}
        {/* Input field for observations */}
        {/* Input field for orderAmmount */}
        {/* Input field for informedDate */}
        {/* Input field for totalArea */}

        {/* <FormControl isInvalid={isError}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={input}
            onChange={handleInputChange}
          />
          <FormErrorMessage>Email is required.</FormErrorMessage>
        </FormControl> */}
      </form>
    </div>
  );
}
