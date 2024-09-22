import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { App, } from 'antd';
import service from '@/service';

function TrainSandBox() {
  const { id } = useParams();
  const [trainData, setTrainData] = useState({});
  const { message } = App.useApp();

  useEffect(() => {
    service.train
      .getTrainData({ id: id as unknown as number })
      .then((data) => {
        setTrainData(data);
        console.log(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
    // 1. 获取训练配置和数据
    //
  }, [id]);

  return <div>{JSON.stringify(trainData)}</div>;
}

export default TrainSandBox;
