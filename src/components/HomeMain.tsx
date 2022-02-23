import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { isLogged } from '../services/user.service';

export default function HomeMain() {
  return (
    <Flex direction="column" alignItems="center">
      <Heading fontWeight={800} mb={2} fontSize="xxx-large">
        HQ & Asociados
      </Heading>
      <Heading fontWeight={400} color="#777777" fontSize="x-large" mb={5}>
        SUBASTAS Y NEGOCIOS INMOBILIARIOS
      </Heading>

      <Link to={isLogged() ? '/causas' : '/login'}>
        <Button mt={5}>
          {isLogged() ? 'Ver causas' : 'Iniciar sesión'}
          <ArrowForwardIcon marginStart={2} />
        </Button>
      </Link>
    </Flex>
  );
}
