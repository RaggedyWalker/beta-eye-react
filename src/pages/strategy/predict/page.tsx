import React, { useState } from 'react';
import { Button, TablePaginationConfig, TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreatePredictDrawer from '@/pages/strategy/predict/components/CreatePredictDrawer.tsx';
import TrendPredictTable from '@/pages/strategy/predict/components/TrendPredictTable.tsx';

export interface TableParams {
  pagination?: TablePaginationConfig;
}

const PredictPage: React.FC = () => {
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

  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const onClose = () => {
    setCreateDrawerOpen(false);
  };

  return (
    <main className="min-h-full px-10 py-4">
      <section className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateDrawerOpen(true)}
        >
          新增
        </Button>
      </section>
      <TrendPredictTable tableParams={tableParams} onChange={onTableChange} />
      <CreatePredictDrawer
        onClose={onClose}
        open={createDrawerOpen}
      ></CreatePredictDrawer>
    </main>
  );
};

export default PredictPage;
