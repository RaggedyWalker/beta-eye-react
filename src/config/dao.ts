import common from '@/config/common.js';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = `${common.BASE_URL}${common.API_NODE_PREFIX}`;

axios.interceptors.response.use(responseInterceptors, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  return error;
});

function responseInterceptors(response: AxiosResponse) {
  if (response.data.code === 200) return response.data;
}
export default axios;
