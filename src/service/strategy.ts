import axios from 'axios';

/**
 * 获取预测列表
 * @param data
 */
async function getPredictPage(data: { pageSize: number; currentPage: number }) {
  const response = await axios.post('/strategy/predict/getPage', data);
  return response.data;
}

/**
 * 搜索股票
 * @param params
 */
async function searchStock(params: { query: string }) {
  const response = await axios.get('/source/stock/search', { params });
  return response.data;
}
export default { getPredictPage, searchStock };
