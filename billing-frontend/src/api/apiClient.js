import axios from "axios";

const token = "6|j91JO8HiVPsqN079o0tHIjYrEoZERNtlQdCXxBOk0b72f222";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token,
  },
});
export default apiClient;