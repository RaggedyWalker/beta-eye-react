import React from 'react';
import { Select, SelectProps } from 'antd';
import type { EnumObject } from '@/types/utils.ts';

const BaseSelect: React.FC<{
  value?: EnumObject | undefined | null;
  onChange?: (newValue: EnumObject | undefined) => void;
  options?: EnumObject[];
  placeholder?: string;
  showSearch?: boolean;
}> = (props) => {
  const value = props.value?.value;
  const options = props.options || [];
  const placeholder = props.placeholder || '请选择';
  console.log('BaseSelect render:', options);
  const handleChange: SelectProps['onChange'] = (value) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <Select
      showSearch={props.showSearch}
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
