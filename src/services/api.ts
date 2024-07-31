import axios from "axios"

const api = axios.create({
  baseURL: `http://192.168.1.20:80`,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken')
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