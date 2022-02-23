import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Order } from '../interfaces/Order';
import DatePicker from './DatePicker/DatePicker';
import { Stack } from '@chakra-ui/react';

export default function OrderObservation() {
  // const { getOrderById } = useOrders();
  const [input, setInput] = useState({
    orderedDate: '',
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
    informedDate: '',
    totalArea: 0,
  } as Order);

  useEffect(() => {
    setInput({
      orderedDate: '22/02/2022',
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
      informedDate: '22/02/2022',
      totalArea: 123123,
    });
  }, []);

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
              <Text style={{ whiteSpace: 'nowrap' }}>Fecha de solicitud: </Text>
              <DatePicker />
            </HStack>
            <HStack>
              <Text style={{ whiteSpace: 'nowrap' }}>Nro Solicitud: </Text>
              <Input value={input.number} />
            </HStack>
          </Flex>
          <HStack>
            <Text>Banco: </Text>
            <Input value={'Banco MACRO'} />
          </HStack>
          <HStack>
            <Text>Sucursal: </Text>
            <Input value={input.office} />
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
                <Input value={input.adress} />
              </HStack>
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Localidad : </Text>
                <Input value={input.city} />
              </HStack>

              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Sup. Total : </Text>
                <Input value={input.totalArea} />
              </HStack>
            </VStack>

            <VStack w={['100%', '100%', '50%']} align="stretch">
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Dpto: </Text>
                <Input value={input.department} />
              </HStack>
              <HStack>
                <Text style={{ whiteSpace: 'nowrap' }}>Provincia: </Text>
                <Input value={input.state} />
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
              <Text>FOLIO: {input.folioNumber}</Text>
            </Box>
            <Box flex={1}>
              <Text>TOMO: {input.volumeNumer}</Text>
            </Box>
            <Box flex={1}>
              <Text>AÑO: {input.yearNumber}</Text>
            </Box>
          </Stack>
        </Box>

        {/* BOX No5 = Observaciones */}
        <Box border="1px solid #000" mb={2} paddingY={2} px={4}>
          <Text style={boxHeadStyle}>Observaciones</Text>
          <Text>{input.observations}</Text>
        </Box>

        <Box mb={2} paddingY={2} px={4}>
          <Flex direction="row" alignItems="stretch">
            <Box flex={1}>
              <Text>Costo del informe: $ {input.orderAmmount}</Text>
              <Text>Informado el día: {input.informedDate}</Text>
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

        {/* Input field for orderedDate */}
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
