export interface CpAmount {
  name: string;
  amount: number;
}

export interface CpDailyAmountData {
  date: Date;
  cpAmountData: CpAmount[];
}

export interface CpDailyAmountResponse {
  cpDailyAmountDatas: CpDailyAmountData[];
}
