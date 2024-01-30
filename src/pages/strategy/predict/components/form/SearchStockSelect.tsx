import React, { useState } from 'react';
import { Select, SelectProps } from 'antd';
import service from '@/service';
import { Stock } from '@/types/stock.ts';

let timeout: ReturnType<typeof setTimeout> | null;
let isComposing = false;
function searchStock(query: string, callback: (arg0: Stock[]) => void) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(fetchData, 500);
  async function fetchData() {
    const data = await service.strategy.searchStock({ query });
    callback(data);
  }
}

const SearchStockSelect: React.FC<{
  value: Stock | undefined | null;
  onChange: (newValue: Stock | undefined) => void;
}> = (props) => {
  const [stockOptions, setStockOptions] = useState<Stock[]>([]);
  const stockValue = props.value?.stockCode;
  console.log('stock:', stockValue);
  const handleStockSearch: SelectProps['onSearch'] = async (query) => {
    console.log(isComposing, query);
    if (!isComposing) {
      // 输入法会有' '，输入中不触发搜索
      if (!query) {
        setStockOptions([]);
        return;
      }
      if (query.includes(' ')) {
        return;
      }
      searchStock(query, setStockOptions);
    }
  };

  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionend') {
      isComposing = false;
      handleStockSearch(e.data); // 输入法输入结束后再进行搜索
    } else {
      isComposing = true;
    }
  };

  const handleStockChange: SelectProps['onChange'] = (newValue) => {
    props.onChange(stockOptions.find((stock) => stock.stockCode === newValue));
  };

  return (
    <Select
      showSearch
      value={stockValue}
      placeholder="输入股票/代码"
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleStockSearch}
      onChange={handleStockChange}
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
      notFoundContent={null}
      allowClear
      options={(stockOptions || []).map((d: Stock) => ({
        value: d.stockCode,
        label: `${d.stockName} (${d.stockCode})`,
      }))}
    />
  );
};

export default React.memo(SearchStockSelect);
