import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React, { MouseEventHandler, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { isLogged, logOut } from '../services/user.service';
const NavBar = (props: { [x: string]: unknown }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle: MouseEventHandler<HTMLDivElement> = () => setIsOpen(!isOpen);

  // type MenuToggleProps = {
  //   toggle: MouseEventHandler<HTMLDivElement>;
  //   isOpen: boolean;
  // };

  type MenuItemProps = {
    children: ReactElement | string;
    isLast?: boolean;
    to: string;
    rest?: Array<string>;
  };

  const MenuItem = ({ children, isLast, to = '/', ...rest }: MenuItemProps) => (
    <Link to={to}>
      <Text display="block" {...rest} _hover={{ textDecoration: 'underline' }}>
        {children}
      </Text>
    </Link>
  );

  const MenuLinks = ({ isMenuOpen }: { isMenuOpen: boolean }) => (
    <Box
      display={{ base: isMenuOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Inicio</MenuItem>
        {!isLogged() ? (
          <>
            {/* <MenuItem to="/registrar-usuario" isLast>
              <Button size="md" rounded="md">
                Crear cuenta
              </Button>
            </MenuItem> */}
            <MenuItem to="/login">
              <Button variant="outline">Iniciar sesión</Button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem to="/orders/table">
              <Button size="md" rounded="md">
                Pedidos
              </Button>
            </MenuItem>
            <MenuItem to="/">
              <Button
                onClick={() => {
                  logOut();
                  window.location.reload();
                }}
                variant="outline-red"
                bg="white"
              >
                Cerrar sesión
              </Button>
            </MenuItem>
          </>
        )}
      </Stack>
    </Box>
  );

  type NavBarContainerProps = {
    children: Array<ReactElement | string>;
    [x: string]: unknown;
  };

  const NavBarContainer = ({ children }: NavBarContainerProps) => (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={0}
      p={4}
      bg="primary.dark"
      color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
      {children}
    </Flex>
  );

  return (
    <NavBarContainer {...props}>
      <Flex direction="row" alignItems="center">
        <Link to="/">
          <Heading ms={4}> HQ - Asociados </Heading>
        </Link>
      </Flex>
      <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Box>
      <MenuLinks isMenuOpen={isOpen} />
    </NavBarContainer>
  );
};

export default NavBar;
