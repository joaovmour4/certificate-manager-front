import axios from "axios";

const api = axios.create({
  baseURL: "http://srv-mg:3000",
});

export default api;