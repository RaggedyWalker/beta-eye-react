import React, { useState } from 'react';
import { Form, Select } from 'antd';
import type { SelectProps } from 'antd';
import service from '@/service';
import { FCProps } from '@/types/react.ts';
import { Stock } from '@/types/stock.ts';

interface CustomProps extends FCProps {}
interface CustomSelectProps extends SelectProps {
  onCompositionStart?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
}

type FieldType = {
  stock: Stock;
  password: string;
};

let timeout: ReturnType<typeof setTimeout> | null;

function searchStock(query: string, callback: (arg0: Stock[]) => void) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(fetchData, 300);
  async function fetchData() {
    const data = await service.strategy.searchStock({ query });
    callback(data);
  }
}

const onFinish = (values: unknown) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log('Failed:', errorInfo);
};

let isComposing = false;

function CreatePredictForm(props: CustomProps) {
  const [stock, setStock] = useState<Stock | undefined>();
  const [stockOptions, setStockOptions] = useState<Stock[]>([]);

  const handleStockSearch: SelectProps['onSearch'] = async (query) => {
    console.log(isComposing, query);
    if (!isComposing) {
      // 输入法会有' '，输入中不触发搜索
      if (!query) {
        setStockOptions([]);
        return;
      }
      if (query.includes(' ')) {
        return;
      }
      searchStock(query, setStockOptions);
    }
  };
  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionend') {
      isComposing = false;
      handleStockSearch(e.data); // 输入法输入结束后再进行搜索
    } else {
      isComposing = true;
    }
  };
  const handleStockChange: SelectProps['onChange'] = (newValue) => {
    setStock(stockOptions.find((stock) => stock.stockCode === newValue));
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="股票"
          name="stock"
          rules={[
            {
              validator: (_, value) => {
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请选择股票'));
              },
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <Select
            showSearch
            value={stock}
            placeholder="选择股票"
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleStockSearch}
            onChange={handleStockChange}
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
            notFoundContent={null}
            allowClear
            options={(stockOptions || []).map((d: Stock) => ({
              value: d.stockCode,
              label: `${d.stockName} (${d.stockCode})`,
            }))}
          />
        </Form.Item>{' '}
      </Form>
    </div>
  );
}

export default CreatePredictForm;
