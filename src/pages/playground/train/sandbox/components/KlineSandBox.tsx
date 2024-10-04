import { useEffect, useMemo, useState } from 'react';
import theme from '@/themes/theme';
import { FCProps } from '@/types/react';
import { SymbolDayLine, TrainKlineConfig } from '@/types/service';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { CallbackDataParams, EChartsOption } from 'echarts/types/dist/shared';
import PriceTooltip from '@/components/common/chart/kLine/PriceTooltip';
import { Transaction } from '../page';

interface CustomProps extends FCProps {
  trainConfig: TrainKlineConfig;
  trainData: SymbolDayLine[];
  transactionRecord: Transaction[];
}

function splitData(rawData: SymbolDayLine[]) {
  const categoryData = [];
  const values = [];
  const volumes = [];
  for (let i = 0; i < rawData.length; i++) {
    const kline = rawData[i];
    categoryData.push(dayjs(kline.timestamp).format('YYYY-MM-DD'));
    values.push([kline.open, kline.close, kline.low, kline.high]);
    volumes.push([i, kline.volume]);
  }

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes,
  };
}

function KlineSandBox(props: CustomProps) {
  const { trainData } = props;
  const [chartData, setChartData] = useState<SymbolDayLine[]>([]);

  const [tooltipData, setTooltipData] = useState<SymbolDayLine>([]);
  const [tooltipPosition, setTooltipPosition] = useState<number[]>([]);

  useEffect(() => {
    setChartData(trainData);
  }, [trainData]);

  const chartOption = useMemo((): EChartsOption => {
    return {
      animation: false,
      legend: { show: false },
      dataset: [
        {
          source: chartData,
          dimensions: [
            'timestamp',
            'high',
            'low',
            'open',
            'close',
            'volume',
            'growthPct',
            'ampPct',
          ],
        },
      ],
      axisPointer: {
        link: [{ xAxisIndex: 'all' }],
        type: 'cross',
        mainType: 'axisPointer',
        snap: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (param) => {
          if (Array.isArray(param)) {
            const result = param[0].data as SymbolDayLine;
            setTooltipData(result);
            return '';
          } else {
            return '';
          }
        },
        position: function (point) {
          setTooltipPosition(point);
          //控制tolltip框的位置
          return [point[0], point[1]]; //设置为鼠标的位置
        },
        enterable: true, //可以让鼠标进入tooltip
      },
      // 数据配置
      series: [
        {
          name: '日线',
          type: 'candlestick',
          id: 'candleSticks',
          xAxisIndex: 0,
          yAxisIndex: 0,
          encode: {
            x: 'timestamp',
            y: ['open', 'close', 'low', 'high'],
          },
          dimensions: [
            'timestamp',
            'open',
            'close',
            'high',
            'low',
            'volume',
            'growthPct',
            'ampPct',
          ],
          itemStyle: {
            color: theme.colors.long,
            color0: theme.colors.short,
            borderColor: undefined,
            borderColor0: undefined,
          },
          barMaxWidth: 28,
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          datasetIndex: 0,
          encode: {
            x: 'timestamp',
            y: 'volume',
          },
          itemStyle: {
            color: (params: CallbackDataParams) => {
              return (params.data as SymbolDayLine).growthPct > 0
                ? theme.colors.long
                : theme.colors.short;
            },
          },
          barMaxWidth: 28,
        },
      ],
      // 横坐标
      xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          boundaryGap: true,
          axisLine: { onZero: false },
          splitLine: { show: false },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisPointer: {
            z: 100,
            label: {
              show: false,
            },
          },
        },
        {
          type: 'category',
          gridIndex: 1,
          boundaryGap: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            show: true,
            formatter: (value, index) => {
              return dayjs(value).format('YYYY-MM-DD');
            },
          },
          axisPointer: {
            z: 100,
            label: {
              formatter(params) {
                return dayjs(params.value).format('YYYY-MM-DD');
              },
            },
          },
        },
      ],
      // 纵坐标
      yAxis: [
        {
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.8,
              type: 'dashed',
            },
          },
          position: 'right',
        },
        {
          type: 'value',
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.8,
              type: 'dashed',
            },
          },
          position: 'right',
        },
      ],
      grid: [
        {
          left: '0%',
          right: '6%',
          top: '5%',
          height: '70%',
        },
        {
          left: '0%',
          right: '6%',
          top: '80%',
          height: '15%',
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          minValueSpan: 20, // 最小缩放范围，至少显示2个数据点
        },
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          minValueSpan: 20, // 最小缩放范围，至少显示2个数据点
        },
      ],
    };
  }, [chartData]);

  return (
    <div className={`${props.className || ''} p-4 relative`}>
      <ReactECharts
        option={chartOption}
        style={{ height: '100%' }}
      ></ReactECharts>
      <PriceTooltip
        blind={props.trainConfig.blind}
        symbolData={tooltipData}
        position={tooltipPosition}
      ></PriceTooltip>
    </div>
  );
}

export default KlineSandBox;
