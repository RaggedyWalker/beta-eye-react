import { useNavigate } from 'react-router-dom';
import { Button, Table, TableProps } from 'antd';
import { FCProps } from '@/types/react.ts';
import { TableParams } from '@/pages/strategy/predict/page.tsx';
import type { PredictRowDataType } from '@/pages/strategy/predict/types';

interface CustomProps extends FCProps {
  tableList: PredictRowDataType[];
  tableParams: TableParams;
  onChange: TableProps['onChange'];
}

function StockNameLink(props: { record: PredictRowDataType }) {
  const navigator = useNavigate();
  const { record } = props;
  return (
    <Button
      type="link"
      onClick={() => navigator(`/market/stock/${record.stockCode}`)}
    >
      {record.stockName}
    </Button>
  );
}

const columns: TableProps<PredictRowDataType>['columns'] = [
  {
    dataIndex: 'stockName',
    title: '股票',
    fixed: 'left',
    width: 120,
    render: (text, record) => <StockNameLink record={record}></StockNameLink>,
  },
  {
    dataIndex: 'stockCode',
    title: '股票代码',
    width: 120,
  },
  {
    dataIndex: 'createTime',
    title: '提出日期',
    width: 100,
  },
  {
    dataIndex: 'goalPrice',
    title: '买点价格',
    width: 100,
  },
  {
    dataIndex: 'predictTrendText',
    title: '走势预测',
    width: 100,
  },
  {
    dataIndex: 'confidenceGradeText',
    title: '策略信心',
    width: 100,
  },
  {
    dataIndex: 'comment',
    title: '策略细节',
    ellipsis: true,
    width: 300,
  },
];

function TrendPredictTable(props: CustomProps) {
  return (
    <div style={{ height: '50vh', overflowY: 'auto' }}>
      <Table
        bordered
        sticky
        rowKey="id"
        columns={columns}
        dataSource={props.tableList}
        pagination={props.tableParams.pagination}
        onChange={props.onChange}
        size="small"
      />
    </div>
  );
}

export default TrendPredictTable;
