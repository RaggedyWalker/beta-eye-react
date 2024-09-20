import React, { FC, useState } from 'react';
import { App, Button, DatePicker, Form, Input, Space, Switch } from 'antd';
import service from '@/service';
import { FCProps } from '@/types/react';
import { Stock } from '@/types/stock';
import { Dayjs } from 'dayjs';
import BetaCard from '@/components/layout/Card';
import SearchStockSelect from '@/pages/strategy/predict/components/form/SearchStockSelect';

interface CustomProps extends FCProps {}
interface FormDataType {
  stock?: Stock;
  startDate?: Dayjs;
  period: number;
  blind: boolean;
  revealTime: boolean;
}
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const initialValues = {
  period: 60,
  blind: true,
  revealTime: false,
};

/**
 * 1. 获取初始化训练参数
 * 2. 记录本次训练参数
 * 3. 获取训练k线数据
 * 4. 记录本次训练数据
 */
const SettingContainer: FC<CustomProps> = (props) => {
  const [form] = Form.useForm<FormDataType>();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  function onValuesChange() {}
  function onReset() {
    form.resetFields();
  }

  function onFinish() {
    form.validateFields().then((values) => {
      setLoading(true);
      service.train
        .initTrain({
          ...values,
          stockCode: values.stock?.stockCode,
          startDate: values.startDate?.valueOf(),
        })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          message.error(e.message);
        })
        .finally(() => setLoading(false));
    });
  }

  function periodLimit(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value);
    const val = Number(e.target.value);
    if (val > 1000) {
      form.setFieldValue('period', 1000);
    }
    if (val < 10) {
      form.setFieldValue('period', 10);
    }
  }

  return (
    <BetaCard
      className={[
        props.className,
        'flex flex-col overflow-y-auto gap-6 px-6 py-4',
      ].join(' ')}
    >
      <h1>训练设置</h1>
      <Form
        {...formLayout}
        labelAlign="left"
        form={form}
        name="control-hooks"
        initialValues={initialValues}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        variant="filled"
      >
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => (
            <Form.Item
              name="stock"
              label="股票"
              rules={[
                { required: !getFieldValue('blind'), message: '选择训练标的' },
                (form) => ({
                  validator(_, value) {
                    if (!getFieldValue('blind') && !value) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <SearchStockSelect disabled={getFieldValue('blind')} />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item shouldUpdate noStyle>
          {({ getFieldValue }) => (
            <Form.Item
              rules={[{ required: false }]}
              name="startDate"
              label="开始时间"
            >
              <DatePicker
                className="w-full"
                disabledDate={(day) => day.isAfter(new Date())}
                disabled={getFieldValue('blind')}
              />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item
          name="period"
          label="周期"
          tooltip="范围：30-600天"
          rules={[{ required: true }]}
        >
          <Input
            className="w-full mr-4 flex-1"
            type="number"
            min={30}
            max={600}
            addonAfter="天"
            onBlur={periodLimit}
          />
        </Form.Item>
        <Form.Item
          name="blind"
          label="双盲随机"
          tooltip="随机生成股票和起始时间"
          rules={[{ required: true }]}
        >
          <Switch></Switch>
        </Form.Item>
        <Form.Item
          name="revealTime"
          label="显示时间"
          rules={[{ required: true }]}
        >
          <Switch></Switch>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              开始
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </BetaCard>
  );
};

export default SettingContainer;
