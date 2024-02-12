import { Page } from '@/types/utils.ts';
import axios from 'axios';
import { PredictRowDataType } from '@/pages/strategy/predict/types';

const strategy = {
  /**
   * 获取预测列表
   * @param data
   */
  getPredictPage: async function (data: {
    pageSize: number;
    currentPage: number;
  }): Promise<Page<PredictRowDataType>> {
    const response = await axios.post('/strategy/predict/getPage', data);
    return response.data;
  },

  /**
   * 新增预测
   * @param data
   */
  addPredict: async function (data: Record<string, any>) {
    const response = await axios.post('/strategy/predict/add', data);
    return response.data;
  },

  /**
   * 搜索股票
   * @param params
   */
  searchStock: async function (params: { query: string }) {
    const response = await axios.get('/source/stock/search', { params });
    return response.data;
  },
};
export default strategy;
