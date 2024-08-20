import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KLineChart from '@/components/common/chart/kLine/KLineChart.tsx';

const StockPage: React.FC = (props) => {
  const { code } = useParams();

  useEffect(() => {
    if (code) {
      // service.stock.dayL({ code }).then((data) => {
      //   console.log(data);
      // });
    }
  }, [code]);
  return (
    <div className="w-full flex h-full" key={code}>
      <KLineChart
        className="min-h-10"
        code={code as NonNullable<string>}
      ></KLineChart>
    </div>
  );
};

export default StockPage;
