import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { isLogged } from '../services/user.service';
import hqLogo from '../resources/images/hq-logo.png';

export default function HomeMain() {
  return (
    <Flex direction="column" alignItems="center">
      <Box maxW="40vh" mt={4}>
        <img src={hqLogo} alt="" />
      </Box>
      <Heading fontWeight={800} mb={2} fontSize="xxx-large">
        HQ & Asociados
      </Heading>
      <Heading fontWeight={400} color="#777777" fontSize="x-large" mb={5}>
        SUBASTAS Y NEGOCIOS INMOBILIARIOS
      </Heading>

      <Link to={isLogged() ? '/excel' : '/login'}>
        <Button mt={5}>
          {isLogged() ? 'Pedidos' : 'Iniciar sesión'}
          <ArrowForwardIcon marginStart={2} />
        </Button>
      </Link>
    </Flex>
  );
}
