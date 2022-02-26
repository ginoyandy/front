import { Divider } from '@chakra-ui/react';
import React from 'react';

export default function PrimaryDivider() {
  return (
    <Divider
      borderColor="primary.light"
      borderWidth="1px"
      mb={2}
      borderRight={0}
      borderLeft={0}
    />
  );
}
