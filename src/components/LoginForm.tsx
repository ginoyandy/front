import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserSchema, UserLogin } from '../schemas/user.schema';
import { logInUser } from '../services/user.service';
import Container from '../layout/Container';

export default function LoginForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const initialErrorValue = {
    username: { value: false, message: '' },
    password: { value: false, message: '' },
  };

  const [errors, setErrors] = useState(initialErrorValue);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const toast = useToast();
  const navigate = useNavigate();

  const submitFormData = async (user: UserLogin) => {
    try {
      await logInUser(user);
      toast({
        title: 'Sesión iniciada',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : null,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  type ValidationError = {
    name: string;
    message: string;
    path: string;
    errors: string[];
    inner: ValidationError[];
    params?: object | undefined;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // reset error messages
    setErrors(initialErrorValue);
    loginUserSchema
      .validate(input, { abortEarly: false })
      .then(async () => {
        await submitFormData(input);
      })
      .catch((err: ValidationError) => {
        console.log(err);
        err.inner.forEach((indivErr) => {
          setErrors((prevValue) => ({
            ...prevValue,
            [indivErr.path]: {
              value: true,
              message: indivErr.errors.join(''),
            },
          }));
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={errors.username.value}>
        <FormLabel htmlFor="email">Email o nombre de usuario</FormLabel>
        <Input
          id="username"
          type="text"
          value={input.username}
          onChange={handleInputChange}
        />
        <FormErrorMessage>{errors.username.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password.value} mt={4}>
        <FormLabel htmlFor="email">Contraseña</FormLabel>
        <Input
          id="password"
          type="password"
          value={input.password}
          onChange={handleInputChange}
        />

        <FormErrorMessage>{errors.password.message}</FormErrorMessage>
      </FormControl>

      <Flex justifyContent="space-between" mt={4}>
        <Link to="/">
          <Button variant="outline-red">Cancelar</Button>
        </Link>
        <Button type="submit">Iniciar Sesión</Button>
      </Flex>
    </form>
  );
}
