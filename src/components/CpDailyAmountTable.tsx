import { useImmutable } from '../swrs/useSwr';
import dayjs from 'dayjs';
import {
  CpDailyAmountResponse,
  CpDailyAmountData,
} from '../interface/CpDailyAmountResponse';

import styles from '../styles/cp-daily-amount-table.module.scss';

interface Props {
  from: Date;
  to: Date;
}

const apiPath: string = '/api/cp/amount/daily';

function createUrl(from: string, to: string): string {
  return apiPath + '?from=' + from + '&to=' + to;
}

function format(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export const CpDailyAmountTable = (props: Props): JSX.Element => {
  const url: string = createUrl(format(props.from), format(props.to));
  const { data, isLoading } = useImmutable(url);
  if (isLoading) return <div className={styles.loading}></div>;
  if (data.status !== undefined) {
    return (
      <div>
        <p className={styles.error}>エラーが発生しました。</p>
      </div>
    );
  }

  const cpDailyAmountDatas = (data as CpDailyAmountResponse).cpDailyAmountDatas;

  if (cpDailyAmountDatas.length === 0) {
    return (
      <>
        <p className={styles.error}>
          該当の期間に発行されたCPが見つかりません。
        </p>
      </>
    );
  }

  const dateRow: JSX.Element = (
    <tr>
      <th></th>
      {cpDailyAmountDatas.map((cpDailyAmountData) => {
        return (
          <th key={format(cpDailyAmountData.date)}>
            {format(cpDailyAmountData.date)}
          </th>
        );
      })}
    </tr>
  );

  const issuerNumber: number = cpDailyAmountDatas[0].cpAmountData.length;
  const dateNumber: number = cpDailyAmountDatas.length;
  const nameAndAmountRows: JSX.Element[] = [];

  for (let i: number = 0; i < issuerNumber; i++) {
    const name: string = cpDailyAmountDatas[0].cpAmountData[i].name;
    const amounts: number[] = [];
    for (let j: number = 0; j < dateNumber; j++) {
      const cpDailyAmountData: CpDailyAmountData = cpDailyAmountDatas[j];
      amounts.push(cpDailyAmountData.cpAmountData[i].amount);
    }

    nameAndAmountRows.push(
      <tr key={i}>
        <th title={name}>{name}</th>
        {amounts.map((amount, index) => {
          return <td key={index}>{amount.toLocaleString()}</td>;
        })}
      </tr>,
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>{dateRow}</thead>
          <tbody>{nameAndAmountRows}</tbody>
        </table>
      </div>
    </main>
  );
};
