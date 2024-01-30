import {apiClient} from "../api/ApiClient";

export const executeBasicAuth = (token) => {
    return apiClient.get(`/basicauth`
        ,
        {
            headers:{
                Authorization: token
            }
        }
    )
}

export const executeJWTAuthenticationService=
(username,password) =>  {
    return apiClient.post(`/authenticate`,{username, password})
}
