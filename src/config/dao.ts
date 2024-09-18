import { message } from 'antd';
import common from '@/config/common.js';
import router from '@/routes';
import { BusinessError } from '@/types/utils';
import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.baseURL = `${common.BASE_URL}${common.API_NODE_PREFIX}`;
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  return config;
});
axios.interceptors.response.use(
  responseInterceptors,
  function (error: AxiosError) {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error.response?.status === 401) {
      const data = error.response?.data;
      message.error((data as Partial<BusinessError>).message);
      router.navigate({ pathname: '/login' });
    }
    return Promise.reject(error.response?.data);
  },
);

function responseInterceptors(response: AxiosResponse) {
  if (response.data.code === 200) return response.data;
}
export default axios;
