import theme from '@/themes/theme';
import { FCProps } from '@/types/react';
import { SymbolDayLine } from '@/types/service';
import Styled from '@emotion/styled';
import dayjs from 'dayjs';

interface CustomProps extends FCProps {
  blind: boolean;
  symbolData: SymbolDayLine;
  position: (number | string)[];
}

function PriceTooltip(props: CustomProps) {
  const { symbolData, position } = props;

  const StyledDiv = Styled.div`

    display: flex;
    justify-content: space-between;
    & > label {
        margin-right: 10px;
    }
  `;

  const fontColor =
    symbolData.growthPct > 0 ? theme.colors.long : theme.colors.short;

  return (
    <div
      className="whitespace-nowrap border-solid p-2 bg-[rgba(213,213,213,0.8)] border-[rgba(213,213,213,0.2)]"
      style={{
        position: 'absolute',
        top: '10px',
        left: '16px',
      }}
    >
      {!props.blind && (
        <StyledDiv>
          <label>时间</label>
          <span>{dayjs(symbolData.timestamp).format('YYYY-MM-DD')}</span>
        </StyledDiv>
      )}
      <StyledDiv>
        <label>开盘</label>
        <span style={{ color: fontColor }}>{symbolData.open}</span>
      </StyledDiv>
      <StyledDiv>
        <label>收盘</label>
        <span style={{ color: fontColor }}>{symbolData.close}</span>
      </StyledDiv>
      <StyledDiv>
        <label>最高</label>
        <span style={{ color: fontColor }}>{symbolData.high}</span>
      </StyledDiv>
      <StyledDiv>
        <label>最低</label>
        <span style={{ color: fontColor }}>{symbolData.low}</span>
      </StyledDiv>
      <StyledDiv>
        <label>涨幅</label>
        <span style={{ color: fontColor }}>{symbolData.growthPct}%</span>
      </StyledDiv>
      <StyledDiv>
        <label>振幅</label>
        <span>{symbolData.ampPct}</span>
      </StyledDiv>
      <StyledDiv>
        <label>成交量</label>
        <span>{symbolData.volume}</span>
      </StyledDiv>
    </div>
  );
}

export default PriceTooltip;
