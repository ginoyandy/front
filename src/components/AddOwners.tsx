import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  Input,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Owner } from '../interfaces/Owner';

type props = {
  owners: Owner[];
  onUpdateOwnerList: (ownerList: Owner[]) => void;
};

export default function AddOwners({ owners, onUpdateOwnerList }: props) {
  const [ownersList, setOwners] = useState(owners as Owner[]);
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    dniType: '',
    ownerType: '',
  } as Owner & Record<string, string>);

  Td.defaultProps = {
    paddingStart: 2,
    paddingEnd: 2,
  };
  //   useEffect(() => {
  //     setOwners([
  //       {
  //         lastName: 'Funes',
  //         firstName: 'Pepito',
  //         dni: '18045679',
  //         dniType: 'DNI',
  //         ownerType: 'Persona Física',
  //       },
  //       {
  //         lastName: 'ARCOR',
  //         firstName: '',
  //         dni: '20-48563984-5',
  //         dniType: 'CUIT',
  //         ownerType: 'Jurídica',
  //       },
  //     ]);
  //   }, []);

  useEffect(() => {
    setOwners(owners);
  }, [owners]);

  useEffect(() => {
    onUpdateOwnerList(ownersList);
  }, [ownersList]);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    setInput((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleOwnerAdd = () => {
    setOwners((prevValue) => [...prevValue, input]);
    setInput({
      firstName: '',
      lastName: '',
      dni: '',
      dniType: '',
      ownerType: '',
    });
  };

  return (
    <Box overflow="auto">
      <Table>
        <TableCaption>
          Utilizar la última fila de la tabla para agregar titulares. <br />{' '}
          Utilizar los botones de eliminar de la columna ACCIONES para quitar un
          titular
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Tipo de documento</Th>
            <Th>Documento</Th>
            <Th>Tipo de Persona</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {owners?.map((owner, i) => (
            <Tr key={i}>
              <Td>{owner.firstName}</Td>
              <Td>{owner.lastName}</Td>
              <Td>{owner.dniType}</Td>
              <Td>{owner.dni}</Td>
              <Td>{owner.ownerType}</Td>
              <Td textAlign="center">
                <DeleteIcon
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => {
                    setOwners((prevValue) =>
                      prevValue.filter((o) => o != owner),
                    );
                  }}
                />
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td>
              <FormControl>
                <Input
                  id="firstName"
                  value={input.firstName}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Td>
            <Td>
              <FormControl>
                <Input
                  id="lastName"
                  value={input.lastName}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Td>
            <Td>
              <FormControl>
                <Input
                  id="dniType"
                  value={input.dniType}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Td>
            <Td>
              <FormControl>
                <Input
                  id="dni"
                  value={input.dni}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Td>
            <Td>
              <FormControl>
                <Input
                  id="ownerType"
                  value={input.ownerType}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Td>
            <Td textAlign="center">
              <Button variant={'outline'} onClick={handleOwnerAdd}>
                <AddIcon />
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
