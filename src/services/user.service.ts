import axios from 'axios';
import { UserRegister, UserLogin } from '../schemas/user.schema';

const BASE_URL = 'http://ec2-3-143-249-194.us-east-2.compute.amazonaws.com/api';
console.log(BASE_URL);

type registerResponse = {
  username: string;
  email: string;
  token: string;
};

export async function registerUser(newUser: UserRegister) {
  try {
    console.log('bb');
    const response = await axios.post(`${BASE_URL}/users`, newUser);
    const { data } = response;
    saveToken(data.token);
    return data as registerResponse;
  } catch (error) {
    throw new Error('User creation has failed');
  }
}

type loginResponse = {
  token: string;
};

type errorResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

export async function logInUser(user: UserLogin) {
  try {
    console.log(user);
    const response = await axios.post(`${BASE_URL}/users/login`, user);
    console.log(response);
    const { data } = response;
    saveToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      'Fallo al iniciar sesión - Posible usuario o contraseña inválidos',
    );
  }
}

export function saveToken(token: string): void {
  window.localStorage.setItem('token', token);
}

export function getToken(): string | null {
  const token = window.localStorage.getItem('token');
  return token;
}

export function logOut(): void {
  window.localStorage.removeItem('token');
}

export function isLogged(): boolean {
  const token = window.localStorage.getItem('token');
  return token != null;
}
