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
