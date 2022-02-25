import React from 'react';
import Container from '../layout/Container';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <Container maxW="container.sm">
      <LoginForm />
    </Container>
  );
}
