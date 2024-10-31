import { Transaction } from '../playground';
import { User } from '../user';

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

export interface TrainKlineConfig {
  id: number;
  name: string;
  code: string;
  startDate: string;
  period: number;
  blind: boolean;
  userId: number;
  finished: boolean;
}

export interface TrainKlineResource {
  config: TrainKlineConfig;
  data: SymbolDayLine[];
  transactions: Transaction[];
}

export interface LoginInfo {
  token: string;
  info: User;
}

export interface AccountApplication {
  userName: string;
  email: string | null;
  phone: string | null;
  origin: string;
  reason: string | null;
  inviteKey: string | null;
  createDate: string | null;
  applyStatus: boolean | null;
  id: number;
}
