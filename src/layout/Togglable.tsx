import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import Container from './Container';
import PrimaryDivider from './PrimaryDivider';

export default function Togglable({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) {
  const [open, setOpen] = useState(false);

  const Icon = () => {
    return (
      <Box onClick={() => setOpen((prev) => !prev)}>
        {open ? (
          <ChevronUpIcon boxSize={10} />
        ) : (
          <ChevronDownIcon boxSize={10} />
        )}
      </Box>
    );
  };

  return (
    <Container>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Heading>{title}</Heading>
        <Icon />
      </Flex>

      {open ? (
        <>
          <PrimaryDivider /> {children}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
