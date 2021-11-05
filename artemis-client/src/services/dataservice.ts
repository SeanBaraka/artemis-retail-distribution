import axios from "axios";

axios.defaults.baseURL = 'https://payments.seanbaraka.dev'
/**
 * 
 * @returns 
 */
export async function getPayments() {
    const request = await axios.get('/payments');
    if (request.status != 200) return Promise.reject();
    return Promise.resolve(request.data);
}