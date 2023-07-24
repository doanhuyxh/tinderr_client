import axios from 'axios';
import {baseUrlHttp} from "./Constant";

const instance = axios.create({
    baseURL: baseUrlHttp,
    //withCredentials: true
});
export default instance;