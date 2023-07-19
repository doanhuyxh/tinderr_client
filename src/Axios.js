import axios from 'axios';

const instance = axios.create({
    baseURL: "http://scammer.click:83",
    //withCredentials: true
});
export default instance;