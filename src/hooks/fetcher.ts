import axios from "axios";
import { parseCookies } from "nookies";
import { TJW_TOKEN } from "../pages/constant/cookie";

export const API_Fetcher = async (url: string) => {
    return await axios
      .get(url, { headers: { authorization: `Bearer ${parseCookies()[TJW_TOKEN]}` } })
      .then(({data}) => data);
  }