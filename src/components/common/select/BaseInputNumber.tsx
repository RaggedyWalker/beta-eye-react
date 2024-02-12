import React from 'react';
import { InputNumber } from 'antd';

const BaseInputNumber: React.FC<{
  value?: string;
  onChange?: (newValue: string | number) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  allowClear?: boolean;
  step?: number;
  precision?: number;
}> = (props) => {
  const value = props.value;
  const placeholder = props.placeholder || '请选择';
  const step = props.step || 0.01;
  const precision = props.precision || 2;
  const handleChange = (value: string | null): void => {
    const originValue = value;
    if (props.onChange) {
      if (originValue === null) {
        props.onChange('');
      } else {
        props.onChange(originValue);
      }
    }
  };

  return (
    <InputNumber
      className="w-full"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      step={step}
      precision={precision}
    />
  );
};

export default BaseInputNumber;
