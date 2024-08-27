import axios from "axios"
import 'dotenv'

const api = axios.create({
  baseURL: `http://${process.env.API_URL}:${process.env.API_PORT}`,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken')
    console.log(api.getUri())
    console.log('tentou requisição')
    if(token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if(error.response && error.response.status === 401){
      localStorage.removeItem('userToken')
      localStorage.removeItem('user')
      alert('Seu login expirou, realize o login novamente.')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default api;