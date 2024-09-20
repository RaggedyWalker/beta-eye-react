import { FC } from 'react';
import { FCProps } from '@/types/react';
import BetaCard from '@/components/layout/Card';

interface CustomProps extends FCProps {}

const HistoryContainer: FC<CustomProps> = (props) => {
  return (
    <BetaCard
      className={[
        props.className,
        'flex flex-col overflow-y-auto gap-6 px-6 py-4',
      ].join(' ')}
    >
      <h1>历史记录</h1>
      <div className=""></div>
    </BetaCard>
  );
};

export default HistoryContainer;
