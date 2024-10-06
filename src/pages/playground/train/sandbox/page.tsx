import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { App } from 'antd';
import service from '@/service';
import { Transaction, TransDirection } from '@/types/playground';
import { SymbolDayLine, TrainKlineResource } from '@/types/service';
import ControlPanel from './components/ControlPanel';
import KlineSandBox from './components/KlineSandBox';

function TrainSandBox() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        if (data.config.finished) {
          setTransActionRecord(data.transactions);
          setChartKlines(data.data);
        } else {
          const index = data.data.findIndex((item) => {
            return new Date(item.timestamp) >= new Date(data.config.startDate);
          });
          setChartKlines(data.data.slice(0, index + 1));
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, [id]);
  
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
      date: new Date(current.timestamp).toISOString(),
      price: current.close,
      amount: amount,
      direction: TransDirection.BUY,
    });
    nextDay();
  }

  function sell(amount: number) {
    const current = chartKlines[chartKlines.length - 1];
    makeTransaction({
      date: new Date(current.timestamp).toISOString(),
      price: current.close,
      amount: amount,
      direction: TransDirection.SELL,
    });
    nextDay();
  }

  async function finish() {
    service.train
      .finishTrain({
        id: parseInt(id as string),
        transactions: transactionRecord,
      })
      .then((data) => {
        navigate('/playground/train', { replace: true });
      })
      .catch((e) => {
        message.error(e.message);
      });
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
            isFinish={isFinish}
          ></KlineSandBox>
          <ControlPanel
            className="w-1/6"
            trainConfig={trainResource.config}
            chartKlines={chartKlines}
            isFinish={isFinish}
            transactionRecord={transactionRecord}
            nextDay={nextDay}
            buy={buy}
            sell={sell}
            finish={finish}
          ></ControlPanel>
        </>
      )}
    </div>
  );
}

export default TrainSandBox;
