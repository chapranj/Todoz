
import {apiClient} from "./ApiClient";
export const callAPI = () => { return apiClient.get('/hello-world-bean'); }

export const callAPIWParam = (param, token) => {
    return apiClient.get(`/hello-world/path-variable/${param}`)
}


