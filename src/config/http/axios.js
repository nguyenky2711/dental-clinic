import axios from 'axios';

const httpHandler = (baseURL) => {
  const axiosHttp = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      const sessionToken = sessionStorage.getItem('persist:root') && JSON.parse(JSON.parse(sessionStorage.getItem('persist:root'))?.auth)?.login?.currentUser?.token;
      const localToken = localStorage.getItem('persist:root') && JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.auth).login?.currentUser?.token;
      const token = sessionToken || localToken || "";
      const interceptedConfig = config;
      interceptedConfig.headers['Authorization'] = "Bearer " + token;
      return interceptedConfig;
    },
    function interceptError(error) {
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    function intercept(response) {
      return response.data;
    },
    function interceptError(error) {
      console.log(error)
      return (error)
      // switch (error.response.status) {
      //   case 409:
      //     return Promise.reject(error);
      //   case 403:
      //     return Promise.reject(error);
      //   case 401:
      //     return Promise.reject(error);
      //   default:
      //     return Promise.reject(error);
      // }
    }
  );

  return axiosHttp;
};

export default httpHandler;
