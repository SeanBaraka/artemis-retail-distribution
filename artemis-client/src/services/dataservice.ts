import axios from "axios";

// axios.defaults.baseURL = 'https://payments.seanbaraka.dev'
axios.defaults.baseURL = 'http://161.97.82.232:3098'
/**
 * 
 * @returns 
 */
export async function getPayments(): Promise<any> {
    const request = await axios.get('/payments');
    console.log('request')
    console.log(request)
    if (request.status != 200) return Promise.reject();
    return Promise.resolve(request.data);
}