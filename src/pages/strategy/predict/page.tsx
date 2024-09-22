import React, { useEffect, useState } from 'react';
import { App, Button, TablePaginationConfig, TableProps } from 'antd';
import service from '@/service';
import { PredictRowDataType } from '@/types/service';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import CreatePredictDrawer from '@/pages/strategy/predict/components/CreatePredictDrawer.tsx';
import TrendPredictTable from '@/pages/strategy/predict/components/table/TrendPredictTable.tsx';

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

const pageStyle: React.CSSProperties = {
  position: 'relative',
};

const PredictPage: React.FC = () => {
  const PageRef = React.useRef<HTMLElement>(null);
  const { message } = App.useApp();
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
  const onTableChange: TableProps<PredictRowDataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    setTableParams({ pagination });
  };

  const onRefresh = () => {
    fetchData()
      .then((data) => setTableList(data.list))
      .catch((e) => message.error(e.message));
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
    <main className="px-10 py-8 relative" ref={PageRef} style={pageStyle}>
      <section className="mb-8">
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
        onOperation={onRefresh}
      />
      {createDrawerOpen && (
        <CreatePredictDrawer
          open={createDrawerOpen}
          onClose={onClose}
          onCreatedPredict={onCreatedPredict}
          containerElement={PageRef.current}
        />
      )}
    </main>
  );
};

export default PredictPage;
