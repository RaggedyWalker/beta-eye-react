import React from 'react';
import HistoryContainer from './components/HistoryContainer';
import SettingContainer from './components/SettingContainer';

const TrainPage: React.FC = () => {
  return (
    <div className="relative grid h-full grid-cols-1 gap-5 overflow-y-auto px-8 py-8 lg:grid-cols-3">
      <SettingContainer className="lg:col-start-1 lg:col-end-2"></SettingContainer>
      <HistoryContainer className="lg:col-span-2"></HistoryContainer>
    </div>
  );
};

export default TrainPage;
