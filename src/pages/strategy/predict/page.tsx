import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: '策略 ID',
    dataIndex: 'strategyId',
  },
  {
    title: '股票代码',
    dataIndex: 'stockCode',
  },
  {
    title: '走势预测',
    dataIndex: 'trendPrediction',
  },
  {
    title: '买点价格',
    dataIndex: 'targetPrice',
  },
  {
    title: '策略信心',
    dataIndex: 'confidence',
  },
  {
    title: '提出日期',
    dataIndex: 'submitDate',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const predictPage = () => {
  return (
    <div className="min-h-full px-10 py-4">
      <div>预测走势</div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default predictPage;
