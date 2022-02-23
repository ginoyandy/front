import axios, { Axios, AxiosRequestHeaders } from 'axios';
import { Order } from '../interfaces/Order';

const { token } = useUser();
const headers: AxiosRequestHeaders = { Authorization: `Bearer ${token}` };

const api: Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL as string,
});

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await api.get('/orders', { headers });
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(
      error.message ? error.messagge : 'Error al solicitar pedidos. ',
    );
  }
}

export async function searchOrderById(orderId: string): Promise<Order> {
  try {
    const response = await api.get(`/orders/${orderId}`, { headers });
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(
      error.message
        ? error.messagge
        : `Error al solicitar pedido con ID = ${orderId}. `,
    );
  }
}

export async function newOrder(nwOrderData: Order) {
  try {
    const response = await api.post('/order', nwOrderData, { headers });
  } catch (error: any) {
    throw new Error(
      error.message ? error.messagge : 'Error al solicitar guardar pedido. ',
    );
  }
}
