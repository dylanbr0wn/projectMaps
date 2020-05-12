import axios from "axios";

export default () => {
    return axios.create({
        // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : process.env.REACT_APP_API_URL,
        baseURL: process.env.REACT_APP_API_URL,
    });
};
