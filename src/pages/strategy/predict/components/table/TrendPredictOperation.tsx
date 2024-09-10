import React from 'react';
import { Dropdown, MenuProps, message, TableProps } from 'antd';
import service from '@/service';
import { FCProps } from '@/types/react.ts';
import { PredictRowDataType } from '@/types/service';
import { RightCircleOutlined } from '@ant-design/icons';

interface CustomProps extends FCProps {
  record: PredictRowDataType;
  onOperation: () => void;
}

const TrendPredictOperation: React.FC<CustomProps> = (props) => {
  const { record, onOperation } = props;

  const handlerSuccess = (record: PredictRowDataType) => {
    console.log(record);
  };

  const handlerFail = (record: PredictRowDataType) => {
    console.log(record);
  };

  const deletePredict = (record: PredictRowDataType) => {
    console.log(record);
    service.strategy.deletePredict(record.id).then(
      () => {
        message.success('删除成功');
        onOperation();
      },
      (err) => {
        console.log(err);
        message.error(err.response.data.message);
      },
    );
  };

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
