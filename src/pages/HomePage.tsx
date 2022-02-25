import { Spacer } from '@chakra-ui/react';
import React from 'react';
import HomeMain from '../components/HomeMain';
import HomeMenu from '../components/HomeMenu';
import Container from '../layout/Container';

export default function HomePage() {
  return (
    <>
      <Container>
        <HomeMain />
      </Container>
      <Spacer />
      <Container>
        <HomeMenu />
      </Container>
    </>
  );
}
