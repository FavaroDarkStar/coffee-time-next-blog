import axios from 'axios';
import { apiKey, authorization } from './key'

export const api = axios.create({
    baseURL: 'https://zoxiikmbajbglemakdih.supabase.co/rest/v1',
    headers: {
        apikey: apiKey,
        Authorization: authorization 
    }

})