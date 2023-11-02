export interface ApiResultModel<T> {
  status: number;
  resultData: T;
  message: string;
}
