import { useEffect, useState } from 'react';
import { App, Button, Form, Input, Space } from 'antd';
import service from '@/service';
import { FCProps } from '@/types/react.ts';
import { Stock } from '@/types/stock.ts';
import BaseInputNumber from '@/components/common/select/BaseInputNumber.tsx';
import BaseSelect from '@/components/common/select/BaseSelect.tsx';
import SearchStockSelect from '@/pages/strategy/predict/components/form/SearchStockSelect.tsx';

interface CustomProps extends FCProps {
  onClose: () => void;
  onCreatedPredict: () => void;
}

interface FieldType {
  stock: Stock;
  goalPrice: number;
  predictTrend: number;
  confidenceGrade: number;
  comment: string;
}

async function fetchOptions() {
  const data = await Promise.all([
    service.configure.getConfigure('predictTrend'),
    service.configure.getConfigure('confidenceGrade'),
  ]);
  return {
    predictTrend: data[0],
    confidenceGrade: data[1],
  };
}

function CreatePredictForm(props: CustomProps) {
  console.log('form render');

  const { message } = App.useApp();
  const [form] = Form.useForm<FieldType>();
  const [options, setOptions] = useState({
    predictTrend: [],
    confidenceGrade: [],
  });
  const onValuesChange = (changedValues: FieldType, allValues: FieldType) => {
    console.log(form.getFieldsValue());
  };
  const onFinish = (values: FieldType) => {
    service.strategy
      .addPredict({
        stockName: values.stock.stockName,
        stockCode: values.stock.stockCode,
        goalPrice: values.goalPrice,
        comment: values.comment,
        predictTrend: values.predictTrend,
        confidenceGrade: values.confidenceGrade,
      })
      .then(() => {
        message.success('新增成功');
        props.onCreatedPredict();
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    fetchOptions().then((newOptions) => {
      setOptions((options) => Object.assign({}, options, newOptions));
    });
  }, []);

  return (
    <div>
      <Form
        className="mt-4"
        name="createPredictForm"
        colon={false}
        labelCol={{ span: 4, offset: 1 }}
        wrapperCol={{ span: 16, offset: 1 }}
        labelAlign="left"
        form={form}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        onReset={onReset}
        autoComplete="off"
        variant="filled"
      >
        <Form.Item
          label="股票"
          name="stock"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请选择股票')),
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <SearchStockSelect />
        </Form.Item>
        <Form.Item
          label="走势预测"
          name="predictTrend"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请选择走势预测')),
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <BaseSelect options={options.predictTrend} />
        </Form.Item>
        <Form.Item
          label="买点价格"
          name="goalPrice"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请输入买点')),
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <BaseInputNumber placeholder="请输入买点价格" allowClear />
        </Form.Item>
        <Form.Item
          label="策略细节"
          name="comment"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请输入策略细节')),
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <Input.TextArea
            placeholder="请输入评价"
            maxLength={150}
            autoSize={{ minRows: 4, maxRows: 6 }}
            showCount
          />
        </Form.Item>
        <Form.Item
          label="策略信心"
          name="confidenceGrade"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请选择策略信心')),
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <BaseSelect options={options.confidenceGrade} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePredictForm;
