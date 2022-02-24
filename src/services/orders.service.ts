import axios, { AxiosRequestHeaders } from 'axios';
import { Order } from './../interfaces/Order';

const token = window.localStorage.getItem('token');
console.log(token);
const headers: AxiosRequestHeaders = {
  Authorization: `Bearer ${token || 'missing_token'}`,
};
const URL = import.meta.env.VITE_APP_API_URL as string;

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await axios.get(`${URL}/orders`, { headers });
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Error al solicitar pedidos. ',
    );
  }
}

export async function searchOrderById(orderId: string): Promise<Order> {
  try {
    const response = await axios.get(`${URL}/orders/${orderId}`, { headers });
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : `Error al solicitar pedido con ID = ${orderId}. `,
    );
  }
}

export async function loadExcel(excelFile: FormData) {
  try {
    const response = await axios.post(`${URL}/orders/excel`, excelFile, {
      headers,
    });
    const { data } = response;
    return data;
  } catch (error) {
    error instanceof Error
      ? error.message
      : 'Error al solicitar guardar pedido. ';
  }
}

export async function newOrder(nwOrderData: Order) {
  try {
    const response = await axios.post(`${URL}/orders`, nwOrderData, {
      headers,
    });
    const { data } = response;
    return data;
  } catch (error) {
    error instanceof Error
      ? error.message
      : 'Error al solicitar guardar pedido. ';
  }
}

export async function putOrder(nwOrderData: Order) {
  try {
    console.log(URL);
    const response = await axios.put(`${URL}/orders`, nwOrderData);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Error al solicitar guardar pedido. ',
    );
  }
}
