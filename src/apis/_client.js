import { create } from "apisauce";

const apiClient = create({
  // DEVELOPMENT
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  timeout: 20000,
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  return response;
};

export default apiClient;
