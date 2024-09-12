export type PredictRowDataType = {
  id: number;
  stockName: string;
  stockCode: string;
  createTime: string;
  goalPrice: number;
  comment: string;
  predictTrend: number;
  predictTrendText: string;
  confidenceGrade: number;
  confidenceGradeText: string;
  status: boolean;
};

export interface SymbolDayLine {
  id: number;
  code: string;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
  amount: number;
  timestamp: number;
  unit: string;
  growthPct: number;
  ampPct: number;
}

export interface TrainKlineResource {
  config: {
    stockCode: string;
    startDate: string;
    period: number;
    blind: boolean;
    revealTime: boolean;
  };
  data: SymbolDayLine[];
}
