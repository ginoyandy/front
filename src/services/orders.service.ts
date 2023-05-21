import axios, { AxiosRequestHeaders } from 'axios';
import { Order } from './../interfaces/Order';
import { AxiosError } from 'axios';
import { OrderDocument } from '../interfaces/Order';

const token = window.localStorage.getItem('token');
const headers: AxiosRequestHeaders = {
  Authorization: `Bearer ${token || 'missing_token'}`,
};
const URL = 'http://ec2-18-228-197-173.sa-east-1.compute.amazonaws.com/api';

export async function getOrders(): Promise<OrderDocument[]> {
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

export async function putOrder(editOrderData: Order, id: string) {
  try {
    console.log(URL);
    const response = await axios.put(`${URL}/orders/${id}`, editOrderData, {
      headers,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    console.log(error.response);
    console.log(error.response.data);
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function getPdfByID(id: string) {
  try {
    console.log(URL);
    const response = await axios.get(`${URL}/orders/pdf/${id}`, {
      headers: {
        ...headers,
      },
      responseType: 'blob',
    });
    console.log('Axios', response);
    console.log('Axios', response);
    return response;
  } catch (error: any) {
    console.log(error);
    console.log(error.response);
    console.log(error.response.data);
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

// export async function newOrder(nwOrderData: Order) {
//   try {
//     const response = await axios.post(`${URL}/orders`, nwOrderData, {
//       headers,
//     });
//     const { data } = response;
//     return data;
//   } catch (error) {
//     error instanceof Error
//       ? error.message
//       : 'Error al solicitar guardar pedido. ';
//   }
// }

// export async function searchOrderById(orderId: string): Promise<Order> {
//   try {
//     const response = await axios.get(`${URL}/orders/${orderId}`, { headers });
//     const { data } = response;
//     return data;
//   } catch (error) {
//     throw new Error(
//       error instanceof Error
//         ? error.message
//         : `Error al solicitar pedido con ID = ${orderId}. `,
//     );
//   }
// }
