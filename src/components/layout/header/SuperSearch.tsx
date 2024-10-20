import React, { useCallback, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { App, AutoComplete, SelectProps } from 'antd';
import service from '@/service';
import { FCProps } from '@/types/react.ts';
import Utils from '@/utils';

const SuperSearch: React.FC<FCProps> = (props) => {
  const [inputValue, setInputValue] = useState('');
  const searchRef = useRef(null);
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const { message } = App.useApp();
  const navigate = useNavigate();

  const debounceSearch = useCallback(
    Utils.debounce(async (value: string) => {
      const query = value;
      if (!query) {
        return;
      }
      try {
        const data = await service.stock.searchStock({ query });
        const options = data.map((item) => ({
          label: `${item.stockName} (${item.stockCode})`,
          value: item.stockCode,
        }));
        setOptions(options);
      } catch (e) {
        message.error((e as Error).message);
      }
    }),
    [],
  );
  // 实现onSelect
  const onSelect = (value: string) => {
    setInputValue(''); // 清空输入框
    navigate(`/market/stock/${value}`);
  };
  return (
    // <section
    //   className={`inline-flex items-center justify-center ${props.className}`}
    // >
    <AutoComplete
      ref={searchRef}
      className={`bg-gray-50 shadow-container ${props.className}`}
      allowClear
      placeholder="搜索股票"
      options={options}
      value={inputValue} // 控制输入值
      onChange={setInputValue} // 更新输入值
      onSearch={debounceSearch}
      onSelect={onSelect}
      variant="borderless"
      popupMatchSelectWidth={false}
      suffixIcon={<BsSearch />}
    ></AutoComplete>
    // </section>
  );
};

export default SuperSearch;
// 清空antd autocomplete
