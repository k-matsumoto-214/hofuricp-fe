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

  const dates: Date[] = (data as CpDailyAmountResponse).dates;
  const cpDailyAmountDatas: CpDailyAmountData[] = (data as CpDailyAmountResponse).cpDailyAmountDatas;

  if (dates.length === 0) {
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
      {dates.map((date) => {
        return (
          <th key={format(date)}>
            {format(date)}
          </th>
        );
      })}
    </tr>
  );

  const nameAndAmountRows: JSX.Element[] = [];

  cpDailyAmountDatas.forEach((cpData, index) => {
    console.log(cpData)
    nameAndAmountRows.push(
      <tr key={cpData.issureName}>
        <th title={cpData.issureName}>{cpData.issureName}</th>
        {cpData.amounts.map((amount, index) => {
          return <td key={index}>{amount.toLocaleString()}</td>;
        })}
      </tr>
    )
   }
  );

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
