export interface Stock {
  stockName: string;
  stockCode: string;
}

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
