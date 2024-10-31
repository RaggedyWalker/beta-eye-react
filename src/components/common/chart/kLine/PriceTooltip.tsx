import { createStyles, css } from 'antd-style';
import theme from '@/themes/theme';
import { FCProps } from '@/types/react';
import { SymbolDayLine } from '@/types/service';
import dayjs from 'dayjs';

interface CustomProps extends FCProps {
  blind: boolean;
  symbolData: SymbolDayLine;
  position: (number | string)[];
}

const useStyles = createStyles({
  labelContainer: css`
    display: flex;
    justify-content: space-between;
    & > label {
      margin-right: 10px;
    }
  `,
});

function PriceTooltip(props: CustomProps) {
  const { symbolData } = props;

  const { styles } = useStyles();
  const fontColor =
    symbolData.growthPct > 0 ? theme.colors.long : theme.colors.short;

  return (
    <div
      className="whitespace-nowrap border-solid border-[rgba(213,213,213,0.2)] bg-[rgba(213,213,213,0.8)] p-2"
      style={{
        position: 'absolute',
        top: '10px',
        left: '16px',
      }}
    >
      {!props.blind && (
        <div className={styles.labelContainer}>
          <label>时间</label>
          <span>{dayjs(symbolData.timestamp).format('YYYY-MM-DD')}</span>
        </div>
      )}
      <div className={styles.labelContainer}>
        <label>开盘</label>
        <span style={{ color: fontColor }}>{symbolData.open}</span>
      </div>
      <div className={styles.labelContainer}>
        <label>收盘</label>
        <span style={{ color: fontColor }}>{symbolData.close}</span>
      </div>
      <div className={styles.labelContainer}>
        <label>最高</label>
        <span style={{ color: fontColor }}>{symbolData.high}</span>
      </div>
      <div className={styles.labelContainer}>
        <label>最低</label>
        <span style={{ color: fontColor }}>{symbolData.low}</span>
      </div>
      <div className={styles.labelContainer}>
        <label>涨幅</label>
        <span style={{ color: fontColor }}>{symbolData.growthPct}%</span>
      </div>
      <div className={styles.labelContainer}>
        <label>振幅</label>
        <span>{symbolData.ampPct}</span>
      </div>
      <div className={styles.labelContainer}>
        <label>成交量</label>
        <span>{symbolData.volume}</span>
      </div>
    </div>
  );
}

export default PriceTooltip;
