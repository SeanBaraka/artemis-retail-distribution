import axios from "axios";
import { io } from 'socket.io-client'

export const socket = io('http://161.97.82.232:3098');

// axios.defaults.baseURL = 'https://payments.seanbaraka.dev'
axios.defaults.baseURL = 'http://161.97.82.232:3098'
/**
 * 
 * @returns 
 */
export async function getPayments(): Promise<any> {
    axios.defaults.baseURL = 'http://161.97.82.232:3098'
    const request = await axios.get('/payments');
    if (request.status != 200) return Promise.reject();
    return Promise.resolve(request.data);
}

export async function getTotalSales(shopid: number) {
    axios.defaults.baseURL = 'https://api-v2.weaverbirdsupplies.co.ke';
    const request = await axios.get(`/shops/${shopid}/sales/total`);
    if (request.status != 200) {
        return Error('could not load sales data')
    }
    return request.data;
}