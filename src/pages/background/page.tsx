import { useState } from 'react';
import BetaCard from '@/components/layout/Card';
import CreateAccountTab from './tabs/CreateAccountTab';

const BackgroundPage: React.FC = () => {
  const tabList = [
    {
      title: '账号申请',
      tab: 'createAccount',
    },
  ];
  const [tab, setTab] = useState<string>(tabList[0].tab);
  return (
    <div className="relative h-full w-full p-8">
      <BetaCard className="grid h-full grid-cols-[auto,1fr] gap-4 py-8 lg:px-10">
        <div className="flex h-full max-w-[200px] flex-col gap-4 border-0 border-r-2 border-solid border-gray-100 pr-4">
          {tabList.map((item, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer hover:text-primary/60 ${tab === item.tab ? 'font-bold text-primary' : ''}`}
                onClick={() => setTab(item.tab)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div className="overflow-auto">
          <div className="">
            {tab === 'createAccount' && <CreateAccountTab></CreateAccountTab>}
          </div>
        </div>
      </BetaCard>
    </div>
  );
};

export default BackgroundPage;
