import React, { FC, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Space, Switch } from 'antd';
import { FCProps } from '@/types/react';
import styled from '@emotion/styled';
import SearchStockSelect from '@/pages/strategy/predict/components/form/SearchStockSelect';
import { Dayjs } from 'dayjs';

interface CustomProps extends FCProps {}
interface FormDataType {
  stockCode?: String;
  startDate?: Dayjs;
  period: number;
  blind: boolean;
  revealTime: boolean;
}

const StyleDiv = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 12px;
  gap: 22px;
  overflow-y: auto;
  border-radius: 4px;
`;
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
  revealTime: false
};

const SettingContainer: FC<CustomProps> = (props) => {
  const [form] = Form.useForm<FormDataType>();

  function onValuesChange() {
    console.log(form.getFieldsValue())
  }
  function onReset() {
    form.resetFields();
  }

  function onFinish() {}

  function periodLimit(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    if (val > 1000) {
      form.setFieldValue('period', 1000);
    }
    if (val < 10) {
      form.setFieldValue('period', 10);
    }
  }

  return (
    <StyleDiv className={[props.className, 'px-6 py-4 bg-slate-100'].join(' ')}>
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
        variant="outlined"
      >
        <Form.Item name="stock" label="股票" rules={[{ required: false }]}>
          <SearchStockSelect />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="开始时间"
          rules={[{ required: false }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="period" label="周期" rules={[{ required: true }]}>
            <Input className="w-full mr-4 flex-1" type='number' min={10} max={1000} addonAfter="天" onChange={periodLimit}/>
        </Form.Item>
        <Form.Item name="blind" label="双盲随机" tooltip="随机生成股票和起始时间。如果已选择起始时间，将在起始时间之后随机生成" rules={[{ required: true }]}>
          <Switch></Switch>
        </Form.Item>
        <Form.Item name="revealTime" label="显示时间" rules={[{ required: true }]}>
          <Switch></Switch>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              开始
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </StyleDiv>
  );
};

export default SettingContainer;
