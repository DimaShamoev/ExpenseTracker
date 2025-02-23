import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
    baseURL: 'http://localhost:2005/api',
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
    }
})