import configure from './configure.ts';
import stock from './stock.ts';
import strategy from './strategy.ts';
import train from './train.ts';

const service = {
  configure,
  strategy,
  stock,
  train,
};
export default service;
