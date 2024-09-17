import configure from './configure.ts';
import stock from './stock.ts';
import strategy from './strategy.ts';
import train from './train.ts';
import user from './user.ts';

const service = {
  configure,
  strategy,
  stock,
  train,
  user,
};
export default service;
