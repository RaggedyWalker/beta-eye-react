import { SymbolDayLine } from '@/types/service';
import { Stock } from '@/types/stock.ts';
import axios from 'axios';

const stock = {
  /**
   * 获取股票日线数据
   * @param data
   */
  dayL: async (data: {
    code: string;
    start?: string;
    end?: string;
  }): Promise<SymbolDayLine[]> => {
    const response = await axios.post('/stock/dayL', data);
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

  /**
   * 搜索股票
   * @param params
   */
  searchStock: async (params: { query: string }): Promise<Stock[]> => {
    const response = await axios.get('/source/stock/search', { params });
    return response.data;
  },
};

export default stock;
