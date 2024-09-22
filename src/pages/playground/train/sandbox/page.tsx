import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '@/service';

function TrainSandBox() {
  const { id } = useParams();
  const [trainData, setTrainData] = useState({});

  useEffect(() => {
    service.train.getTrainData({ id: id as unknown as number }).then((data) => {
      setTrainData(data);
      console.log(data);
    });
    // 1. 获取训练配置和数据
    //
  }, [id]);

  return <div>{JSON.stringify(trainData)}</div>;
}

export default TrainSandBox;
