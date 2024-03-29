import React, { useEffect, useState } from 'react';
import { Button, message, TablePaginationConfig, TableProps } from 'antd';
import service from '@/service';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import CreatePredictDrawer from '@/pages/strategy/predict/components/CreatePredictDrawer.tsx';
import TrendPredictTable from '@/pages/strategy/predict/components/TrendPredictTable.tsx';
import { PredictRowDataType } from '@/pages/strategy/predict/types';

export interface TableParams {
  pagination?: TablePaginationConfig;
}
const fetchData = async () => {
  const data = await service.strategy.getPredictPage({
    currentPage: 1,
    pageSize: 10,
  });
  return {
    ...data,
    list: data.list.map((item) => {
      return {
        ...item,
        createTime: dayjs(item.createTime).format('YYYY-M-D'),
      };
    }),
  };
};

const PredictPage: React.FC = () => {
  // control table
  const [tableList, setTableList] = useState<PredictRowDataType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      position: ['bottomCenter'],
      showQuickJumper: true,
      showSizeChanger: true,
      hideOnSinglePage: true,
    },
  });
  const onTableChange: TableProps['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    setTableParams({ pagination });
  };

  useEffect(() => {
    console.log('fetch table');
    fetchData()
      .then((data) => setTableList(data.list))
      .catch((e) => message.error(e.message));
  }, [tableParams]);

  // control drawer
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const onClose = () => {
    setCreateDrawerOpen(false);
  };
  const onCreatedPredict = () => {
    setCreateDrawerOpen(false);
    // 触发table的查询
    const newTableParams = {
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    };
    setTableParams(newTableParams);
  };

  return (
    <main className="min-h-full">
      <section className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateDrawerOpen(true)}
        >
          新增
        </Button>
      </section>
      <TrendPredictTable
        tableList={tableList}
        tableParams={tableParams}
        onChange={onTableChange}
      />
      <>
        {createDrawerOpen && (
          <CreatePredictDrawer
            open={createDrawerOpen}
            onClose={onClose}
            onCreatedPredict={onCreatedPredict}
          />
        )}
      </>
    </main>
  );
};

export default PredictPage;
