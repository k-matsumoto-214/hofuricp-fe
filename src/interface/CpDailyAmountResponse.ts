export interface CpDailyAmountData {
  issureName: string;
  amounts: number[];
}

export interface CpDailyAmountResponse {
  dates: Date[];
  cpDailyAmountDatas: CpDailyAmountData[];
}
