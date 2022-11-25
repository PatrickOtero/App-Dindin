import axios from "axios"

// const localUrl = "http://localhost:3334"
const remoteUrl = "https://angry-gray-crayfish.cyclic.app"

export const api = axios.create({ 
    baseURL: remoteUrl,
});

export const apiAuth = axios.create({
    baseURL: remoteUrl,
})

apiAuth.interceptors.request.use((config) => {
    const storageToken = localStorage.getItem("Token");
    const token = storageToken.slice(1, storageToken.length-1)

    if(token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
