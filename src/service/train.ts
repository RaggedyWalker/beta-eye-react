import { TrainKlineConfig, TrainKlineResource } from '@/types/service';
import axios from 'axios';

const train = {
  /**
   * 获取股票日线数据
   * @param data
   */
  initTrain: async (data: {
    stockName?: string;
    stockCode?: string;
    startDate?: number;
    period: number;
    blind: boolean;
    revealTime: boolean;
  }): Promise<TrainKlineConfig> => {
    const response = await axios.post('/train/init', data);
    return response.data;
  },

  getTrainData: async (data: { id: number }): Promise<TrainKlineResource> => {
    const response = await axios.get('/train/getTrainData', {
      params: data,
    });
    return response.data;
  },
};

export default train;
