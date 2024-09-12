import { FC } from 'react';
import { FCProps } from '@/types/react';
import styled from '@emotion/styled';

interface CustomProps extends FCProps {}

const StyleDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  // > div {
  //   flex: 1;
  // }
`;

const HistoryContainer: FC<CustomProps> = (props) => {
  return (
    <StyleDiv className={[props.className, 'bg-slate-100'].join(' ')}>
      <h1>历史记录</h1>
      <div className=""></div>
    </StyleDiv>
  );
};

export default HistoryContainer;
