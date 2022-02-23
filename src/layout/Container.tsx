import React from 'react';
import { Container as ChakraContainer } from '@chakra-ui/react';
import { LayoutProps } from '@chakra-ui/styled-system/src/config/index';

type props = {
  maxW?: LayoutProps['maxW'];
  children: JSX.Element | JSX.Element[];
};

export default function Container({ maxW, children }: props) {
  return (
    <ChakraContainer
      maxW={maxW || 'container.lg'}
      mt={[0, 0, 0, 8]}
      mx="auto"
      bg="white"
      boxShadow="sm"
      borderRadius={[0, 0, 0, 'xl']}
      py={4}
      px={8}
    >
      {children}
    </ChakraContainer>
  );
}
