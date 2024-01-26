import { useEffect, useState } from 'react';
import { message, Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import service from '@/service';
import { FCProps } from '@/types/react.ts';
import dayjs from 'dayjs';
import { TableParams } from '@/pages/strategy/predict/page.tsx';

interface CustomProps extends FCProps {
  tableParams: TableParams;
  onChange: TableProps['onChange'];
}
interface DataType {
  key: string;
  stockName: string;
  stockCode: string;
  createTime: string;
  goalPrice: string;
  predictTrendText: string;
  comment: string;
  confidenceGradeText: string;
}

const columns: ColumnsType<DataType> = [
  {
    dataIndex: 'stockName',
    title: '股票',
    fixed: 'left',
  },
  {
    dataIndex: 'stockCode',
    title: '股票代码',
  },
  {
    dataIndex: 'createTime',
    title: '提出日期',
  },
  {
    dataIndex: 'goalPrice',
    title: '买点价格',
  },
  {
    dataIndex: 'predictTrendText',
    title: '走势预测',
  },
  {
    dataIndex: 'comment',
    title: '评价',
  },
  {
    dataIndex: 'confidenceGradeText',
    title: '策略信心',
  },
];

const fetchData = async () => {
  const data = await service.strategy.getPredictPage({
    currentPage: 1,
    pageSize: 10,
  });
  return {
    ...data,
    list: data.list.map((item: { createTime: string }) => {
      return {
        ...item,
        createTime: dayjs(item.createTime).format('YYYY-M-D'),
      };
    }),
  };
};

function TrendPredictTable(props: CustomProps) {
  const [tableList, setTableList] = useState([]);

  useEffect(() => {
    console.log('fetch table');
    fetchData()
      .then((data) => setTableList(data.list))
      .catch((e) => message.error(e.message));
  }, [props.tableParams]);

  return (
    <Table
      bordered
      rowKey="id"
      columns={columns}
      dataSource={tableList}
      pagination={props.tableParams.pagination}
      onChange={props.onChange}
      size="small"
    />
  );
}

export default TrendPredictTable;
