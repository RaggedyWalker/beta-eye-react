import { useEffect, useMemo, useState } from 'react';
import { App, Button } from 'antd';
import { createStyles, css } from 'antd-style';
import theme from '@/themes/theme';
import { Transaction } from '@/types/playground';
import { FCProps } from '@/types/react';
import { SymbolDayLine, TrainKlineConfig } from '@/types/service';
import Utils from '@/utils';
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
  finish: (endingGrowthPct: number) => void;
}
const useStyles = createStyles({
  labelContainer: css`
    display: flex;
    justify-content: space-between;
    & > label {
      margin-right: 10px;
    }
  `,
  buyButton: css`
    background-color: ${theme.colors.long};
    &:hover {
      background-color: ${Utils.getRgbaVar(
        theme.colors.long,
        theme.colors.hover,
      )};
    }
    &:active {
      background-color: ${Utils.getRgbaVar(
        theme.colors.long,
        theme.colors.active,
      )};
    }
  `,
  sellButton: css`
    background-color: ${theme.colors.short};
    &:hover {
      background-color: ${Utils.getRgbaVar(
        theme.colors.short,
        theme.colors.hover,
      )};
    }
    &:active {
      background-color: ${Utils.getRgbaVar(
        theme.colors.short,
        theme.colors.active,
      )};
    }
  `,
});

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
  const { styles } = useStyles();

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
    <Card className={`${props.className || ''} m-6 flex flex-col`}>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {!blind && (
          <>
            <p className={styles.labelContainer}>
              <label>股票</label>
              {`${trainConfig.name}(${trainConfig.code})`}
            </p>
            <p className={styles.labelContainer}>
              <label>开始时间</label>
              {dayjs(trainConfig.startDate).format('YYYY-MM-DD')}
            </p>
          </>
        )}
        <p className={styles.labelContainer}>
          <label>训练周期</label>
          {trainConfig.period}天
        </p>

        <p className={styles.labelContainer}>
          <label>初始资产</label>
          {Utils.formatNumber(seed)}
        </p>
        <p className={styles.labelContainer}>
          <label>当前资产</label>
          {Utils.formatNumber(currentAssets)}
        </p>
        <p className={styles.labelContainer}>
          <label>收益率</label>
          <span
            style={{
              color:
                currentAssets >= seed ? theme.colors.long : theme.colors.short,
            }}
          >
            {(((currentAssets - seed) / seed) * 100).toFixed(2)}%
          </span>
        </p>
        <p className={styles.labelContainer}>
          <label>现金</label>
          {cash.toFormat()}
        </p>
        <p className={styles.labelContainer}>
          <label>持有股数</label>
          {Utils.formatNumber(holding)}
        </p>

        {!trainConfig.finished && !isFinish && (
          <p className={`${styles.labelContainer} flex-wrap gap-4`}>
            <Button
              type="primary"
              onClick={handleBuy}
              className={`w-full xl:w-auto ${styles.buyButton}`}
            >
              买入
            </Button>

            <Button
              type="primary"
              onClick={handleSell}
              className={`w-full xl:w-auto ${styles.sellButton}`}
            >
              卖出
            </Button>
            <Button
              className="w-full"
              type="primary"
              disabled={isFinish}
              onClick={nextDay}
            >
              下一天
            </Button>
          </p>
        )}
      </div>
      {!trainConfig.finished && (
        <div className="mt-4 p-4">
          <Button
            className="w-full"
            onClick={() => {
              finish(
                Number((((currentAssets - seed) / seed) * 100).toFixed(2)),
              );
            }}
          >
            结束训练
          </Button>
        </div>
      )}
    </Card>
  );
}

export default ControlPanel;
