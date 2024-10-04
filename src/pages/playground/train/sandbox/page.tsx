import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { App } from 'antd';
import service from '@/service';
import { TrainKlineConfig, TrainKlineResource } from '@/types/service';
import ControlPanel from './components/ControlPanel';
import KlineSandBox from './components/KlineSandBox';

enum Direction {
  BUY,
  SELL,
}
export interface Transaction {
  id?: number;
  date: Date;
  price: number;
  amount: number;
  direction: Direction;
}

function TrainSandBox() {
  const { id } = useParams();
  const [trainResource, setTrainResource] = useState<TrainKlineResource>();
  const [transactionRecord, setTransActionRecord] = useState<Transaction[]>([]);
  const { message } = App.useApp();

  useEffect(() => {
    service.train
      .getTrainData({ id: id as unknown as number })
      .then((data) => {
        setTrainResource(data);
        console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
    // 1. 获取训练配置和数据
    //
  }, [id]);

  function makeTransaction(t: Transaction) {
    setTransActionRecord([...transactionRecord, t]);
  }

  return (
    <div className="flex h-full">
      {trainResource && (
        <>
          <KlineSandBox
            className="flex-1 pr-0"
            trainConfig={trainResource?.config as TrainKlineConfig}
            trainData={trainResource.data}
            transactionRecord={transactionRecord}
          ></KlineSandBox>
          <ControlPanel
            className="w-1/6"
            trainConfig={trainResource?.config as TrainKlineConfig}
            makeTransaction={makeTransaction}
          ></ControlPanel>
        </>
      )}
    </div>
  );
}

export default TrainSandBox;
