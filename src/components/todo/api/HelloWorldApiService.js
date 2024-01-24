import axios from "axios";
import { useParams } from "react-router-dom";


const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const callAPI = () => { return apiClient.get('/hello-world-bean'); }

export const callAPIWParam = (param) => {return apiClient.get(`/hello-world/path-variable/${param}`)}