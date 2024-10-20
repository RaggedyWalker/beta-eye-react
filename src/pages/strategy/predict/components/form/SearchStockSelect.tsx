import React from 'react';
import { Select, SelectProps } from 'antd';
import { FCProps } from '@/types/react';
import { Stock } from '@/types/stock.ts';
import useStockSearch from '@/hooks/useStockSearch';

interface customProps extends FCProps {
  value?: Stock | undefined | null;
  // eslint-disable-next-line no-unused-vars
  onChange?: (newValue: Stock | undefined) => void;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
}

const SearchStockSelect: React.FC<customProps> = (props) => {
  const { stockOptions, handleSearch } = useStockSearch();
  const stockValue = props.value?.stockCode;

  const handleStockChange: SelectProps['onChange'] = (newValue) => {
    if (props.onChange) {
      props.onChange(
        stockOptions.find((stock) => stock.stockCode === newValue),
      );
    }
  };
  return (
    <Select
      showSearch
      value={stockValue}
      placeholder="输入股票/代码"
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleStockChange}
      notFoundContent={null}
      allowClear
      disabled={props.disabled}
      size={props.size || 'middle'}
      options={(stockOptions || []).map((d: Stock) => ({
        value: d.stockCode,
        label: `${d.stockName} (${d.stockCode})`,
      }))}
    />
  );
};

export default SearchStockSelect;
