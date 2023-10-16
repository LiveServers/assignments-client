import axios from "axios";
import {store} from "../redux/store";
import {setOpen} from "@/redux/reducers/backdropReducer";
import { setResponseState } from "@/redux/reducers/responseStateReducer";

// const token = store.getState().setTokenReducer.token;

//https://expressjs-postgres-production-ac2c.up.railway.app/
const http = axios.create({
    baseURL: "http://localhost:3333/",
    timeout: 1000000,
    headers: {
      "Content-Type": "application/json"
    }
});

const logOut = () => {
    store.dispatch(setOpen(true));
    http.post("api/v1/account/log-out").then((res)=>{
        store.dispatch(setOpen(false));
        store.dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
    }).catch((e)=>{
        store.dispatch(setOpen(false));
        store.dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
    });
}

// Add a request interceptor
http.interceptors.request.use(
    config => {
        const token = store.getState().setTokenReducer.token;
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      if((config.url.includes('api/v1/account/sign-in') || config.url.includes('api/v1/account/create-account'))) {
        delete config.headers.Authorization;
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
)

http.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
      const originalRequest = error.config
      if (
        error?.code === "ERR_NETWORK" 
      ) {
        // window?.location?.replace(window?.location?.origin+"/create-account");
        // window?.localStorage?.setItem("token","");
        return Promise.reject(error)
      }
      if (
        error.response.status === 401 
      ) {
        // window?.location?.replace(window?.location?.origin+"/create-account");
        // window?.localStorage?.setItem("token","");
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
)

export default http;