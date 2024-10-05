import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { App } from 'antd';
import service from '@/service';
import { SymbolDayLine, TrainKlineResource } from '@/types/service';
import ControlPanel from './components/ControlPanel';
import KlineSandBox from './components/KlineSandBox';

export enum Direction {
  BUY,
  SELL,
}
export interface Transaction {
  id?: number;
  date: number;
  price: number;
  amount: number;
  direction: Direction;
}

function TrainSandBox() {
  const { id } = useParams();
  const [trainResource, setTrainResource] = useState<TrainKlineResource>();
  const [chartKlines, setChartKlines] = useState<SymbolDayLine[]>([]);

  const [transactionRecord, setTransActionRecord] = useState<Transaction[]>([]);
  const { message } = App.useApp();

  // 1. 获取训练配置和数据
  useEffect(() => {
    service.train
      .getTrainData({ id: id as unknown as number })
      .then((data) => {
        setTrainResource(data);
        const index = data.data.findIndex((item) => {
          return new Date(item.timestamp) >= new Date(data.config.startDate);
        });
        setChartKlines(data.data.slice(0, index + 1));
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [id]);

  useEffect(() => {
    console.log('transactionRecord:', transactionRecord);
  }, [transactionRecord]);

  function makeTransaction(t: Transaction) {
    setTransActionRecord([...transactionRecord, t]);
  }

  function nextDay() {
    if (trainResource) {
      const index = trainResource.data.findIndex(
        (item) =>
          item.timestamp === chartKlines[chartKlines.length - 1].timestamp,
      );
      const i = index >= trainResource.data.length - 1 ? index : index + 1;
      setChartKlines([...chartKlines, trainResource.data[i]]);
    }
  }

  function buy(amount: number) {
    const current = chartKlines[chartKlines.length - 1];
    makeTransaction({
      date: current.timestamp,
      price: current.close,
      amount: amount,
      direction: Direction.BUY,
    });
    nextDay();
  }

  function sell(amount: number) {
    const current = chartKlines[chartKlines.length - 1];
    makeTransaction({
      date: current.timestamp,
      price: current.close,
      amount: amount,
      direction: Direction.SELL,
    });
    nextDay();
  }

  const isFinish = useMemo(() => {
    if (trainResource) {
      return trainResource.data.length === chartKlines.length;
    }
    return true;
  }, [chartKlines, trainResource]);

  return (
    <div className="flex h-full">
      {trainResource !== undefined && (
        <>
          <KlineSandBox
            className="flex-1"
            trainConfig={trainResource.config}
            transactionRecord={transactionRecord}
            chartKlines={chartKlines}
          ></KlineSandBox>
          <ControlPanel
            className="w-1/6"
            trainConfig={trainResource.config}
            makeTransaction={makeTransaction}
            chartKlines={chartKlines}
            nextDay={nextDay}
            isFinish={isFinish}
            buy={buy}
            sell={sell}
          ></ControlPanel>
        </>
      )}
    </div>
  );
}

export default TrainSandBox;
