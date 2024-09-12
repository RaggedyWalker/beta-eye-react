import { TrainKlineResource } from '@/types/service';
import axios from 'axios';

const train = {
  /**
   * 获取股票日线数据
   * @param data
   */
  dayL: async (data: {
    stockCode?: string;
    startDate?: string;
    period: number;
    blind: boolean;
    revealTime: boolean;
  }): Promise<TrainKlineResource> => {
    const response = await axios.post('/train/init', data);
    return response.data.map((item: any) => ({
      ...item,
      high: Number(item.high),
      low: Number(item.low),
      open: Number(item.open),
      close: Number(item.close),
      timestamp: item.timestamp,
      // timestamp: dayjs(item.timestamp).toDate().getTime(),
    }));
  },
};

export default train;
