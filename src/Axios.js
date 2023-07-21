import axios from 'axios';

const instance = axios.create({
    baseURL: "http://server.tinderr.id.vn",
    //withCredentials: true
});
export default instance;