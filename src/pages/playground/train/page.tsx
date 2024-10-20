/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import HistoryContainer from './components/HistoryContainer';
import SettingContainer from './components/SettingContainer';

const StyledMain = styled.main`
  height: 100%;
  position: relative;
  gap: 22px;
`;

const TrainPage = () => {
  return (
    <StyledMain className="grid grid-cols-1 overflow-y-auto px-8 py-8 lg:grid-cols-3">
      <SettingContainer className="lg:col-start-1 lg:col-end-2"></SettingContainer>
      <HistoryContainer className="lg:col-span-2"></HistoryContainer>
    </StyledMain>
  );
};

export default TrainPage;
