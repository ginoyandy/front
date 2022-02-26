import { AttachmentIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import { Heading, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeMenu() {
  return (
    <>
      <Heading textDecoration="underline" mb={2}>
        Acciones
      </Heading>
      <List>
        <Link to="/excel">
          <ListItem
            fontSize={18}
            _hover={{
              color: 'primary.semidark',
              textDecoration: 'underline',
            }}
          >
            <AttachmentIcon me={2} />
            Cargar un documento excel
          </ListItem>
        </Link>
        <Link to="/orders/table">
          <ListItem
            fontSize={18}
            _hover={{
              color: 'primary.semidark',
              textDecoration: 'underline',
            }}
          >
            <SearchIcon me={2} />
            Ver pedidos anteriores
          </ListItem>
        </Link>
      </List>
    </>
  );
}
