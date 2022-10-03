import axios from 'axios';
import { parseCookies } from 'nookies';
import { TJW_TOKEN } from './cookie';

export const fetcher = (url: string) => axios.get(url, {
  headers: {
    Authorization: 'Bearer ' + parseCookies()[TJW_TOKEN],
  }
}).then(res => res.data);
