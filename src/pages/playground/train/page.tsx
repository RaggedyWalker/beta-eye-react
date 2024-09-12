/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import HistoryContainer from './components/HistoryContainer';
import SettingContainer from './components/SettingContainer';

const StyledMain = styled.main`
  display: flex;
  height: 100%;
  position: relative;
  display: flex;
  gap: 22px;
`;

const TrainPage = () => {
  return (
    <StyledMain className="px-10 py-8">
      <SettingContainer className="w-1/3"></SettingContainer>
      <HistoryContainer className="flex-1"></HistoryContainer>
    </StyledMain>
  );
};

export default TrainPage;
