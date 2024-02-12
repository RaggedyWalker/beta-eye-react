import React, { ChangeEvent } from 'react';
import { Input } from 'antd';

const BaseInput: React.FC<{
  value?: string;
  onChange?: (newValue: string | number) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  allowClear?: boolean;
}> = (props) => {
  const value = props.value;
  const type = props.type || 'text';
  const placeholder = props.placeholder || '请选择';
  const allowClear = props.allowClear || true;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const originValue = event.target.value;
    if (props.onChange) {
      if (type === 'number') {
        props.onChange(parseFloat(originValue) || '');
      } else {
        props.onChange(originValue);
      }
    }
  };
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const originValue = event.target.value;
      console.log(originValue);
      let newValue = originValue;

      newValue = newValue.replace(/[^\d.]/g, ''); // 只能输入数字和.
      newValue = newValue.replace(/^\./g, ''); // 第一个字符不能是.
      newValue = newValue.replace(/\.{2,}/g, '.'); // 不能连续输入.
      newValue = newValue.replace(/(\.\d+)\./g, '$1'); // .后面不能再输入.
      newValue = newValue.replace(/^0+(\d)/, '$1'); // 第一位0开头，0后面为数字，则过滤掉，取后面的数字
      newValue = newValue.replace(/(\d{2})\d*/, '$1'); // 最多保留2位整数
      newValue = newValue.replace(/(\.\d{2})\d*/, '$1'); // 最多保留2位小数

      // 将不是数字的字符删除掉，用正则实现
      // let newValue = originValue.replace(/[^\d.-]/g, '');

      // 确保只有一个小数点，并且去除多余的字符
      // newValue = newValue.replace(/(?!\.)\.(?=.*\.)/g, ''); // 移除多余的中间小数点
      // newValue = newValue.replace(/^0+(?=\d)/, ''); // 移除数字开头的多余零（如：001.00 -> 1.00）

      // 正则表达式允许整数和小数，但最多只包含一个小数点
      // const numberPattern = /^-?\d+(\.\d{1,2})?$/; // 修改这里以限制小数位数（例如这里是最多两位小数）
      // 如果输入不符合我们的数字格式，则将值重置为空字符串
      // if (!numberPattern.test(newValue)) {
      //   newValue = '';
      // }
      event.target.value = newValue;
    }
  };

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onInput={handleInput}
      allowClear={allowClear}
    />
  );
};

export default BaseInput;
