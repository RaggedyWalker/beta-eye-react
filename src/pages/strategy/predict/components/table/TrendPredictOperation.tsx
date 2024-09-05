import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { FCProps } from '@/types/react.ts';
import { PredictRowDataType } from '@/types/service';
import { RightCircleOutlined } from '@ant-design/icons';

interface CustomProps extends FCProps {
  record: PredictRowDataType;
}

const handlerSuccess = (record: PredictRowDataType) => {
  console.log(record);
};

const handlerFail = (record: PredictRowDataType) => {
  console.log(record);
};

const deletePredict = (record: PredictRowDataType) => {
  console.log(record);
};

const TrendPredictOperation: React.FC<CustomProps> = (props) => {
  const { record } = props;
  const items: MenuProps['items'] = [
    {
      label: <span onClick={() => handlerSuccess(record)}>预测成功</span>,
      key: '0',
    },
    {
      label: <span onClick={() => handlerFail(record)}>预测失败</span>,
      key: '1',
    },
    {
      label: <span onClick={() => deletePredict(record)}>删除</span>,
      key: '2',
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <RightCircleOutlined />
      </a>
    </Dropdown>
  );
};

export default TrendPredictOperation;
