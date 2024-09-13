import { TrainKlineConfig } from '@/types/service';
import axios from 'axios';

const train = {
  /**
   * 获取股票日线数据
   * @param data
   */
  initTrain: async (data: {
    stockCode?: string;
    startDate?: number;
    period: number;
    blind: boolean;
    revealTime: boolean;
  }): Promise<TrainKlineConfig> => {
    const response = await axios.post('/train/init', data);
    return response.data;
  },
};

export default train;
