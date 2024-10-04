import { useState } from 'react';
import { Button } from 'antd';
import theme from '@/themes/theme';
import { FCProps } from '@/types/react';
import { TrainKlineConfig } from '@/types/service';
import Utils from '@/utils';
import Styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Transaction } from '../page';

interface CustomProps extends FCProps {
  trainConfig: TrainKlineConfig;
  makeTransaction: (t: Transaction) => void;
}

const seed = 1000000;
const StyledP = Styled.p`
    display: flex;
    justify-content: space-between;
    & > label {
        font-weight: bold;
    }
`;

const BuyButton = Styled(Button)`
    background-color: ${theme.colors.long};
    &:hover {
        background-color: ${Utils.getRgbaVar(theme.colors.long, theme.colors.hover)};
    }
    &:active {
        background-color: ${Utils.getRgbaVar(theme.colors.long, theme.colors.active)};
    }
`;
const SellButton = Styled(Button)`
    background-color: ${theme.colors.short};
    &:hover {
        background-color: ${Utils.getRgbaVar(theme.colors.short, theme.colors.hover)};
    }
    &:active {
        background-color: ${Utils.getRgbaVar(theme.colors.short, theme.colors.active)};
    }
`;

function ControlPanel(props: CustomProps) {
  const { trainConfig, makeTransaction } = props;
  const [current, setCurrent] = useState(seed);
  console.log(trainConfig);

  return (
    <div className={`${props.className || ''} flex flex-col bg-container-base`}>
      <div className="flex flex-col gap-4 flex-1  p-4 overflow-auto">
        <StyledP>
          <label>股票</label>
          {trainConfig.blind
            ? 'xxxxxx'
            : `${trainConfig.name}(${trainConfig.code})`}
        </StyledP>
        <StyledP>
          <label>训练周期</label>
          {trainConfig.period}天
        </StyledP>
        <StyledP>
          <label>开始时间</label>
          {trainConfig.blind
            ? 'xxxxxx'
            : dayjs(trainConfig.startDate).format('YYYY-MM-DD')}
        </StyledP>
        <StyledP>
          <label>初始资金</label>
          {Utils.formatNumber(seed)}
        </StyledP>
        <StyledP>
          <label>当前资金</label>
          {Utils.formatNumber(current)}
        </StyledP>
        <StyledP>
          <label>收益率</label>
          {((current - seed) / seed) * 100}%
        </StyledP>
        <StyledP>
          <BuyButton type="primary">买入</BuyButton>
          <SellButton type="primary">卖出</SellButton>
        </StyledP>
        <StyledP>
          <Button className="w-full" type="primary">
            下一天
          </Button>
        </StyledP>
      </div>
      <div className="mt-4  p-4 ">
        <Button className="w-full">结束训练</Button>
      </div>
    </div>
  );
}

export default ControlPanel;
