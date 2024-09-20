import { useNavigate } from 'react-router-dom';
import { Button, Table, TableProps } from 'antd';
import { FCProps } from '@/types/react.ts';
import type { PredictRowDataType } from '@/types/service';
import dayjs from 'dayjs';
import BetaCard from '@/components/layout/Card';
import TrendPredictOperation from '@/pages/strategy/predict/components/table/TrendPredictOperation.tsx';
import { TableParams } from '@/pages/strategy/predict/page.tsx';

interface CustomProps extends FCProps {
  tableList: PredictRowDataType[];
  tableParams: TableParams;
  onChange: TableProps<PredictRowDataType>['onChange'];
  onOperation: () => void;
}

function StockNameLink(props: { record: PredictRowDataType }) {
  const navigator = useNavigate();
  const { record } = props;
  return (
    <Button
      type="link"
      style={{ paddingLeft: 0 }}
      onClick={() => navigator(`/market/stock/${record.stockCode}`)}
    >
      {record.stockName}
    </Button>
  );
}

function TrendPredictTable(props: CustomProps) {
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
      render: (text) => dayjs(text).format('YYYY-MM-DD'),
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
    {
      dataIndex: 'operation',
      title: '操作',
      width: 100,
      align: 'center',
      render: (text, record) => {
        return (
          <TrendPredictOperation
            record={record}
            onOperation={props.onOperation}
          />
        );
      },
    },
  ];

  return (
    <BetaCard>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={props.tableList}
        pagination={props.tableParams.pagination}
        onChange={props.onChange}
        size="small"
        sticky={{ offsetHeader: 64 }}
      />
    </BetaCard>
  );
}

export default TrendPredictTable;
