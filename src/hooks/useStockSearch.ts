import { useEffect, useState } from 'react';
import service from '@/service';
import { Stock } from '@/types/stock.ts';

let timeout: ReturnType<typeof setTimeout> | null = null;

function useStockSearch() {
  const [stockOptions, setStockOptions] = useState<Stock[]>([]);

  const searchStock = (query: string) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(async () => {
      if (!query.includes(' ')) {
        const data = await service.stock.searchStock({ query });
        setStockOptions(data);
      }
    }, 500);
  };

  const handleSearch = (query: string) => {
    if (query) {
      searchStock(query);
    } else {
      setStockOptions([]);
    }
  };

  return {
    stockOptions,
    handleSearch,
  };
}

export default useStockSearch;
