import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Form, Input } from 'antd';
import service from '@/service';
import { FCProps } from '@/types/react.ts';
import { Stock } from '@/types/stock.ts';
import type { EnumObject } from '@/types/utils.ts';
import BaseSelect from '@/components/common/select/BaseSelect.tsx';
import SearchStockSelect from '@/pages/strategy/predict/components/form/SearchStockSelect.tsx';

interface CustomProps extends FCProps {}

type FieldType = {
  stock: Stock;
  goalPrice: string;
  predictTrend: EnumObject;
  confidenceGrade: EnumObject;
};

const onFinish = (values: unknown) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log('Failed:', errorInfo);
};
function CreatePredictForm(props: CustomProps) {
  const [options, setOptions] = useState({
    predictTrend: [],
    confidenceGrade: [],
  });
  const [stock, setStock] = useState<Stock | undefined | null>();
  const [predictTrend, setPredictTrend] = useState<
    EnumObject | undefined | null
  >();
  const [confidenceGrade, setConfidenceGrade] = useState<
    EnumObject | undefined | null
  >();
  const [goalPrice, setGoalPrice] = useState('0.00');
  console.log('form render');

  function fetchOptions() {
    Promise.all([
      service.configure.getConfigure('predictTrend'),
      service.configure.getConfigure('confidenceGrade'),
    ]).then((data) => {
      const newOptions = {
        ...options,
        predictTrend: data[0],
        confidenceGrade: data[1],
      };
      setOptions(newOptions);
    });
  }

  useEffect(() => {
    console.log('effect');
    fetchOptions();
  }, []);

  const handleChange = useMemo(
    () => ({
      stock: (newStock: Stock | undefined | null) => {
        setStock(newStock);
      },
      predictTrend: (value: EnumObject | undefined | null) => {
        setPredictTrend(value);
      },
      confidenceGrade: (value: EnumObject | undefined | null) => {
        setConfidenceGrade(value);
      },
      goalPrice: (event: ChangeEvent<HTMLInputElement>) => {
        setGoalPrice(event.currentTarget.value + '');
      },
    }),
    [],
  );

  return (
    <div>
      <Form
        name="createPredictForm"
        colon={false}
        labelCol={{ span: 6, offset: 0 }}
        wrapperCol={{ span: 14, offset: 1 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        variant="filled"
      >
        <Form.Item<FieldType>
          label="股票"
          // name="stock"
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
          <SearchStockSelect value={stock} onChange={handleChange.stock} />
        </Form.Item>
        <Form.Item<FieldType>
          label="走势预测"
          // name="predictTrend"
          rules={[
            {
              validator: (_, value) => {
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请选择走势预测'));
              },
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <BaseSelect
            value={predictTrend}
            onChange={handleChange.predictTrend}
            options={options.predictTrend}
          />
        </Form.Item>
        <Form.Item<FieldType> label="买点价格">
          <Input
            placeholder="请输入买点价格"
            value={goalPrice}
            onChange={handleChange.goalPrice}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="策略信心"
          // name="confidenceGrade"
          rules={[
            {
              validator: (_, value) => {
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请选择策略信心'));
              },
              validateTrigger: 'onBlur',
            },
          ]}
        >
          {useMemo(
            () => (
              <BaseSelect
                value={confidenceGrade}
                onChange={handleChange.confidenceGrade}
                options={options.confidenceGrade}
              />
            ),
            [options.confidenceGrade],
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePredictForm;
