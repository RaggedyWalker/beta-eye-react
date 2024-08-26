import React, { useEffect, useState } from 'react';
import service from '@/service';
import { FCProps } from '@/types/react.ts';
import { Period } from '@/types/utils.ts';
import Utils from '@/utils';
import {
  CandleType,
  Chart,
  dispose,
  FormatDateType,
  IndicatorCreate,
  init,
  LineType,
  PolygonType,
  registerStyles,
  utils,
} from '@raggedywalkerjonny/klinecharts';

interface klineChartProps extends FCProps {
  data?: [
    number,
    number,
    number,
    number,
    number,
    number,
    string,
    number,
    number,
  ][];
  code: string;
}
const red = '#F92855';
// const green = '#2DC08E';
// const green = '#4de6e6';
const green = 'rgb(46 171 106)';

const alphaRed = 'rgba(249, 40, 85, .7)';
const alphaGreen = 'rgba(46 171 106, 0.7)';
registerStyles('red_rise_green_fall', {
  // 网格线
  grid: {
    show: true,
    horizontal: {
      show: true,
      size: 1,
      color: '#3a3a3a',
      // style: LineType.Dashed,
      dashedValue: [2, 2],
    },
    vertical: {
      show: false,
      size: 1,
      color: '#3a3a3a',
      // style: LineType.Dashed,
      dashedValue: [2, 2],
    },
  },
  xAxis: {
    tickLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  yAxis: {
    tickLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  candle: {
    bar: {
      upColor: red,
      downColor: green,
      upBorderColor: red,
      downBorderColor: green,
      upWickColor: red,
      downWickColor: green,
    },
    priceMark: {
      last: {
        upColor: red,
        downColor: green,
      },
      low: {
        show: true,
      },
      high: {
        show: true,
      },
    },
  },
  indicator: {
    ohlc: {
      upColor: alphaRed,
      downColor: alphaGreen,
    },
    bars: [
      {
        style: PolygonType.Fill,
        borderStyle: LineType.Solid,
        borderSize: 1,
        borderDashedValue: [2, 2],
        upColor: red,
        downColor: green,
        noChangeColor: '#888888',
      },
    ],
    circles: [
      {
        style: PolygonType.Fill,
        borderStyle: LineType.Solid,
        borderSize: 1,
        borderDashedValue: [2, 2],
        upColor: red,
        downColor: green,
        noChangeColor: '#888888',
      },
    ],
  },
});

function setMainIndicator(
  chart: NonNullable<Chart>,
  value: string | IndicatorCreate,
) {
  chart.createIndicator(value, true, { id: 'candle_pane' });
}

function setSubIndicator(
  chart: NonNullable<Chart>,
  value: string | IndicatorCreate,
) {
  chart.createIndicator(value);
}

function getIndicatorMA(): IndicatorCreate {
  return {
    name: 'MA',
    shortName: 'MA',
    calcParams: [5, 10, 20, 60, 250],
    figures: [
      { key: 'ma5', title: 'MA5: ', type: 'line' },
      { key: 'ma10', title: 'MA10: ', type: 'line' },
      { key: 'ma20', title: 'MA20: ', type: 'line' },
      { key: 'ma60', title: 'MA60: ', type: 'line' },
      { key: 'ma250', title: 'MA250: ', type: 'line' },
    ],
    // 当计算参数改变时，希望提示的和参数一样，即title的值需要改变
    regenerateFigures: (params) => {
      return params.map((p, i) => {
        return { key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' };
      });
    },
    // 计算结果
    calc: (kLineDataList, { calcParams, figures }) => {
      // 注意：返回数据个数需要和kLineDataList的数据个数一致，如果无值，用{}代替即可。
      // 计算参数最好取回调参数calcParams，如果不是，后续计算参数发生变化的时候，这里计算不能及时响应
      const closeSums: number[] = [];
      return kLineDataList.map((kLineData, i) => {
        const ma: { [key: string]: number } = {};
        const close = kLineData.close;
        calcParams.forEach((param, j) => {
          closeSums[j] = (closeSums[j] || 0) + close;
          if (i >= param - 1) {
            ma[figures[j].key] = closeSums[j] / param;
            closeSums[j] -= kLineDataList[i - (param - 1)].close;
          }
        });
        // 如果有值的情况下，这里每一项的数据格式应该是 { ma1: xxx, ma2: xxx }
        // 每个key需要和figures中的子项key对应的值一致
        return ma;
      });
    },
  };
}

const KLineChart: React.FC<klineChartProps> = (props) => {
  let chartRef: Chart | null = null;
  const [period] = useState<Period>(Period.day);
  useEffect(() => {
    // 初始化图表
    const chart = init('chart', {
      eventOptions: { moveStep: 1 },
      locale: 'zh-CN',
      customApi: {
        formatDate: (
          dateTimeFormat: Intl.DateTimeFormat,
          timestamp,
          format: string,
          type: FormatDateType,
        ) => {
          switch (period) {
            case 'minute': {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, 'HH:mm');
              }
              return utils.formatDate(
                dateTimeFormat,
                timestamp,
                'YYYY-MM-DD HH:mm',
              );
            }
            case 'hour': {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(
                  dateTimeFormat,
                  timestamp,
                  'MM-DD HH:mm',
                );
              }
              return utils.formatDate(
                dateTimeFormat,
                timestamp,
                'YYYY-MM-DD HH:mm',
              );
            }
            case 'day':
            case 'week':
              return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD');
            case 'month': {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM');
              }
              return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD');
            }
            case 'year': {
              if (type === FormatDateType.XAxis) {
                return utils.formatDate(dateTimeFormat, timestamp, 'YYYY');
              }
              return utils.formatDate(dateTimeFormat, timestamp, 'YYYY-MM-DD');
            }
          }
          return utils.formatDate(
            dateTimeFormat,
            timestamp,
            'YYYY-MM-DD HH:mm',
          );
        },
      },
    });
    if (chart) {
      chartRef = chart;
      chart.setStyles('red_rise_green_fall');
      chart.setStyles({ candle: { type: CandleType.CandleUpStroke } });
      setSubIndicator(chart, 'VOL');
      setMainIndicator(chart, getIndicatorMA());
      chart.setLocale('zh-CN');
      // get timezone
      chart.setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      // 为图表添加数据
      service.stock.dayL({ code: props.code }).then((data) => {
        chart.applyNewData(data);
      });
    }

    return () => {
      // 销毁图表
      dispose('chart');
    };
  }, []);

  useEffect(() => {
    const resizeChart = Utils.debounce(() => {
      console.log(chartRef);
      chartRef?.resize();
      chartRef?.scrollToRealTime();
    }, 200);
    window.addEventListener('resize', resizeChart);
    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return (
    <div className={`w-full ${props.className}`}>
      {/*<SettingBar></SettingBar>*/}
      <div
        id="chart"
        className={`h-full`}
        style={{ backgroundColor: '#1b1b1f' }}
      />
    </div>
  );
};

export default KLineChart;
