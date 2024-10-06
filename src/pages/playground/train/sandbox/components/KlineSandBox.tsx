import { useEffect, useState } from 'react';
import theme from '@/themes/theme';
import { Transaction, TransDirection } from '@/types/playground';
import { FCProps } from '@/types/react';
import { SymbolDayLine, TrainKlineConfig } from '@/types/service';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { CallbackDataParams, EChartsOption } from 'echarts/types/dist/shared';
import PriceTooltip from '@/components/common/chart/kLine/PriceTooltip';
import Card from '@/components/layout/Card';

interface CustomProps extends FCProps {
  trainConfig: TrainKlineConfig;
  transactionRecord: Transaction[];
  chartKlines: SymbolDayLine[];
  isFinish: boolean;
}

type ChartKline = Omit<SymbolDayLine, 'timestamp'> & {
  timestamp: number | string;
};

function calculateMA(dayCount: number, data: ChartKline[]) {
  const lines = data.map((kline) => [
    kline.open,
    kline.close,
    kline.low,
    kline.high,
  ]);
  const result = [];
  for (let i = 0, len = lines.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += lines[i - j][0];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}

function KlineSandBox(props: CustomProps) {
  const { trainConfig, chartKlines, transactionRecord, isFinish } = props;
  const [chartOption, setChartOption] = useState<EChartsOption>({});
  const [tooltipData, setTooltipData] = useState<SymbolDayLine | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<number[]>([]);

  const [chartEvents] = useState({
    globalout: (event: any) => {
      setTooltipData(null);
    },
  });

  useEffect(() => {
    const finalData: ChartKline[] = chartKlines.map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp).toISOString(),
    }));
    const option: EChartsOption = {
      animation: false,
      legend: { show: false },
      dataset: [
        {
          source: finalData,
          dimensions: [
            { name: 'timestamp' },
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
          // encode: {
          //   x: 'timestamp',
          //   y: ['open', 'close', 'low', 'high'],
          // },
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
          markPoint: {
            animation: false,
            label: {
              formatter: function (param) {
                return (param.value as TransDirection) === TransDirection.BUY
                  ? '买入'
                  : '卖出';
              },
            },
            symbolSize: 12,
            data: transactionRecord.map((t) => {
              const index = finalData.findIndex(
                (data) => data.timestamp === new Date(t.date).toISOString(),
              );
              return {
                name: 'Mark',
                coord: [index, t.price],
                symbolRotate: t.direction === TransDirection.BUY ? 0 : 180,
                symbolOffset: [
                  0,
                  t.direction === TransDirection.BUY ? '500%' : '-500%',
                ],
                itemStyle: {
                  borderJoin: 'miter',
                  opacity: 0.8,
                  color:
                    t.direction === TransDirection.BUY
                      ? theme.colors.long
                      : theme.colors.short,
                },
                symbol: 'triangle',
                value: t.direction,
                label: {
                  color:
                    t.direction === TransDirection.BUY
                      ? theme.colors.long
                      : theme.colors.short,
                  position:
                    t.direction === TransDirection.BUY ? 'bottom' : 'top',
                },
              };
            }),
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [
              {
                name: 'min line on low',
                type: 'min',
                valueDim: 'low',
                lineStyle: {
                  color: 'blue', // 线条颜色
                  type: 'dashed', // 线条样式：虚线
                },
                label: {
                  position: 'insideStartTop',
                  fontSize: 8,
                },
              },
              {
                name: 'max line on high',
                type: 'max',
                valueDim: 'high',
                lineStyle: {
                  color: 'red', // 线条颜色
                  type: 'dashed', // 线条样式：虚线
                },
                label: {
                  position: 'insideStartTop',
                  fontSize: 8,
                },
              },
              {
                name: 'start',
                xAxis: new Date(trainConfig.startDate).toISOString(),
                lineStyle: {
                  color: theme.colors.primary, // 线条颜色
                  type: 'solid', // 线条样式：虚线
                  opacity: 0.2,
                },
                label: {
                  show: true,
                  formatter: '开始',
                  color: theme.colors['text-base'],
                  opacity: 0.6,
                },
                symbolRotate: 90,
              },
            ],
            blur: {
              lineStyle: {
                type: 'dashed', // 线条样式：虚线
              },
            },
          },
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5, finalData),
          symbol: 'none',
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10, finalData),
          symbol: 'none',
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20, finalData),
          symbol: 'none',
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA60',
          type: 'line',
          data: calculateMA(60, finalData),
          symbol: 'none',
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA120',
          type: 'line',
          data: calculateMA(120, finalData),
          symbol: 'none',
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
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
          data: finalData.map((kline) => kline.timestamp),
          gridIndex: 0,
          boundaryGap: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            show: false,
            formatter: (value, index) => {
              return dayjs(value).format('YYYY-MM-DD');
            },
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
          axisLine: { onZero: true },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            show: !blind,
            formatter: (value, index) => {
              return dayjs(value).format('YYYY-MM-DD');
            },
            showMinLabel: true,
            fontSize: 8,
            // interval: 20
          },
          axisPointer: {
            z: 100,
            label: {
              show: !blind,
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
          left: '1.6%',
          right: '5.4%',
          top: '5%',
          height: '70%',
        },
        {
          left: '1.6%',
          right: '5.4%',
          top: '80%',
          height: '15%',
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          minValueSpan: 20, // 最小缩放范围，至少显示2个数据点
          maxValueSpan: 200 * 5,
        },
      ],
    };
    setChartOption({ ...chartOption, ...option });
  }, [chartKlines, transactionRecord]);

  const blind = isFinish ? false : trainConfig.blind;

  return (
    <Card className={`${props.className || ''} pl-4 relative m-6`}>
      <ReactECharts
        option={chartOption}
        style={{ height: '100%' }}
        onEvents={chartEvents}
      ></ReactECharts>
      {tooltipData && (
        <PriceTooltip
          blind={blind}
          symbolData={tooltipData}
          position={tooltipPosition}
        ></PriceTooltip>
      )}
    </Card>
  );
}

export default KlineSandBox;
