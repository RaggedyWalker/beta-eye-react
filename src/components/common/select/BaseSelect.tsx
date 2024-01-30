import React from 'react';
import { Select, SelectProps } from 'antd';
import type { EnumObject } from '@/types/utils.ts';

const BaseSelect: React.FC<{
  value: EnumObject | undefined | null;
  onChange: (newValue: EnumObject | undefined) => void;
  options?: EnumObject[];
  placeholder?: string;
}> = (props) => {
  const value = props.value?.value;
  const options = props.options || [];
  const placeholder = props.placeholder || '请选择';
  console.log('BaseSelect options:', options);
  const handleChange: SelectProps['onChange'] = (value) => {
    props.onChange(options.find((option) => option.value === value));
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onChange={handleChange}
      notFoundContent={null}
      allowClear
      options={options}
    />
  );
};

export default BaseSelect;
