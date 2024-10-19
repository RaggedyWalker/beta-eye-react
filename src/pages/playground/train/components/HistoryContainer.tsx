import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import service from '@/service';
import { FCProps } from '@/types/react';
import { TrainKlineConfig } from '@/types/service';
import dayjs from 'dayjs';
import BetaCard from '@/components/layout/Card';

interface CustomProps extends FCProps {}

const HistoryContainer: FC<CustomProps> = (props) => {
  const [historyList, setHistoryList] = useState<TrainKlineConfig[]>([]);
  const { message } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    service.train
      .myTrainHistory()
      .then((data) => {
        setHistoryList(data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);

  return (
    <BetaCard
      className={[
        props.className,
        'flex flex-col gap-6 overflow-y-auto px-6 py-4',
      ].join(' ')}
    >
      <section className="text-lg font-bold">历史记录</section>
      <div className="flex flex-col gap-6">
        {historyList.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer items-center gap-10 rounded-xl bg-slate-100 p-4 hover:text-primary"
            onClick={() => navigate(`/playground/train/sandbox/${item.id}`)}
          >
            <p className="text-base font-bold">{`${item.name} (${item.code})`}</p>
            <p className="text-base">
              训练周期：{dayjs(item.startDate).format('YYYY-MM-DD')} ~{' '}
              {dayjs(item.startDate)
                .add(item.period, 'day')
                .format('YYYY-MM-DD')}
            </p>
            <p className="ml-auto border-4 text-base">
              {item.finished ? '已结束' : '未完成'}
            </p>
          </div>
        ))}
      </div>
    </BetaCard>
  );
};

export default HistoryContainer;
