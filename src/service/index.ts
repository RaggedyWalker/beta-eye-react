import stock from '@/service/stock.ts';
import strategy from '@/service/strategy.ts';
import configure from './configure.js';

const service = {
  configure,
  strategy,
  stock,
};
export default service;
