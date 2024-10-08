import { useEffect, useMemo, useState } from 'react';
import { App, Button } from 'antd';
import theme from '@/themes/theme';
import { Transaction } from '@/types/playground';
import { FCProps } from '@/types/react';
import { SymbolDayLine, TrainKlineConfig } from '@/types/service';
import Utils from '@/utils';
import Styled from '@emotion/styled';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import Card from '@/components/layout/Card';

interface CustomProps extends FCProps {
  trainConfig: TrainKlineConfig;
  chartKlines: SymbolDayLine[];
  isFinish: boolean;
  transactionRecord: Transaction[];
  nextDay: () => void;
  buy: (amount: number) => void;
  sell: (amount: number) => void;
  finish: () => void;
}

const StyledP = Styled.p`
    display: flex;
    justify-content: space-between;
    font-weight: bolder;
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

// 初始资产
const seed = 1000000;

function ControlPanel(props: CustomProps) {
  const {
    trainConfig,
    isFinish,
    chartKlines,
    transactionRecord,
    nextDay,
    buy,
    sell,
    finish,
  } = props;
  const { message } = App.useApp();

  // 持仓股数
  const [holding, setHolding] = useState(0);
  // 现金
  const [cash, setCash] = useState(new BigNumber(seed));
  // 当前总资产 = 持仓股数 * 当前价格 + 现金
  const currentAssets: number = useMemo(() => {
    const currentKline = chartKlines[chartKlines.length - 1];
    return new BigNumber(currentKline.close)
      .times(holding)
      .plus(cash)
      .toNumber();
  }, [chartKlines, holding, cash]);

  useEffect(() => {
    if (trainConfig.finished) {
      const _holding = transactionRecord.reduce(
        (prev: number, current: Transaction) => {
          return prev + current.amount * current.direction * -1;
        },
        0,
      );
      setHolding(_holding);
      const _cash = transactionRecord.reduce(
        (prev: BigNumber, current: Transaction) => {
          return new BigNumber(current.price)
            .times(current.amount * current.direction)
            .plus(prev);
        },
        new BigNumber(seed),
      );
      setCash(_cash);
    }
  }, []);

  /**
   * 目前仅支持全仓交易
   */
  function handleBuy() {
    const current = chartKlines[chartKlines.length - 1];
    // 买入多少股
    const amount = cash
      .dividedToIntegerBy(current.close * 100)
      .times(100)
      .toNumber();
    if (amount <= 0) {
      return message.info('无法买入原因: 现金余额不足');
    }
    setHolding(amount);
    setCash(cash.minus(new BigNumber(current.close).times(amount)));
    buy(amount);
  }

  function handleSell() {
    if (holding <= 0) {
      return message.info('无法卖出原因: 没有持仓');
    }
    const current = chartKlines[chartKlines.length - 1];
    setHolding(0);
    setCash(cash.plus(new BigNumber(current.close).times(holding)));
    sell(holding);
  }

  const blind = isFinish ? false : trainConfig.blind;

  return (
    <Card className={`${props.className || ''} flex flex-col m-6`}>
      <div className="flex flex-col gap-4 flex-1  p-4 overflow-y-auto">
        {!blind && (
          <>
            <StyledP>
              <label>股票</label>
              {`${trainConfig.name}(${trainConfig.code})`}
            </StyledP>
            <StyledP>
              <label>开始时间</label>
              {dayjs(trainConfig.startDate).format('YYYY-MM-DD')}
            </StyledP>
          </>
        )}
        <StyledP>
          <label>训练周期</label>
          {trainConfig.period}天
        </StyledP>

        <StyledP>
          <label>初始资产</label>
          {Utils.formatNumber(seed)}
        </StyledP>
        <StyledP>
          <label>当前资产</label>
          {Utils.formatNumber(currentAssets)}
        </StyledP>
        <StyledP>
          <label>收益率</label>
          <span
            style={{
              color:
                currentAssets >= seed ? theme.colors.long : theme.colors.short,
            }}
          >
            {(((currentAssets - seed) / seed) * 100).toFixed(2)}%
          </span>
        </StyledP>
        <StyledP>
          <label>现金</label>
          {cash.toFormat()}
        </StyledP>
        <StyledP>
          <label>持有股数</label>
          {Utils.formatNumber(holding)}
        </StyledP>

        {!trainConfig.finished && !isFinish && (
          <StyledP className="gap-4 flex-wrap">
            <BuyButton type="primary" onClick={handleBuy} className='w-full xl:w-auto'>
              买入  
            </BuyButton>

            <SellButton type="primary" onClick={handleSell} className='w-full xl:w-auto'>
              卖出
            </SellButton>
            <Button
              className="w-full"
              type="primary"
              disabled={isFinish}
              onClick={nextDay}
            >
              下一天
            </Button>
          </StyledP>
        )}
      </div>
      {!trainConfig.finished && (
        <div className="mt-4  p-4 ">
          <Button className="w-full" onClick={finish}>
            结束训练
          </Button>
        </div>
      )}
    </Card>
  );
}

export default ControlPanel;
