import { Container as ChakraContainer } from '@chakra-ui/react';
import React from 'react';

type props = {
  maxW?: any;
  children: JSX.Element | JSX.Element[];
};

export default function Container({ maxW, children }: props) {
  return (
    <ChakraContainer
      maxW={maxW || 'container.lg'}
      mt={maxW === 'container.sm' ? [0, 8, 8, 8, 8, 8] : [0, 0, 0, 8]}
      mx="auto"
      bg="white"
      boxShadow="sm"
      borderRadius={
        maxW === 'container.sm'
          ? [0, 'xl', 'xl', 'xl', 'xl', 'xl']
          : [0, 0, 0, 'xl']
      }
      py={4}
      px={8}
    >
      {children}
    </ChakraContainer>
  );
}
