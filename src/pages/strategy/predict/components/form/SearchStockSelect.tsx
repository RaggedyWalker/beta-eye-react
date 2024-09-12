import React from 'react';
import { Select, SelectProps } from 'antd';
import { Stock } from '@/types/stock.ts';
import useStockSearch from '@/hooks/useStockSearch';

const SearchStockSelect: React.FC<{
  value?: Stock | undefined | null;
  onChange?: (newValue: Stock | undefined) => void;
}> = (props) => {
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
      options={(stockOptions || []).map((d: Stock) => ({
        value: d.stockCode,
        label: `${d.stockName} (${d.stockCode})`,
      }))}
    />
  );
};

export default SearchStockSelect;
