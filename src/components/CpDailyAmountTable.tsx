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
const ExcelJS = require('exceljs');

function createUrl(from: string, to: string): string {
  return apiPath + '?from=' + from + '&to=' + to;
}

function format(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

let dates: Date[] = [];
let cpDailyAmountDatas: CpDailyAmountData[] = [];

// グラフ描画用メソッド
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

  dates = (data as CpDailyAmountResponse).dates;
  cpDailyAmountDatas = (data as CpDailyAmountResponse).cpDailyAmountDatas;
  dates = (data as CpDailyAmountResponse).dates;
  cpDailyAmountDatas = (data as CpDailyAmountResponse).cpDailyAmountDatas;

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
        return <th key={format(date)}>{format(date)}</th>;
        return <th key={format(date)}>{format(date)}</th>;
      })}
    </tr>
  );

  const nameAndAmountRows: JSX.Element[] = [];

  cpDailyAmountDatas.forEach((cpData, index) => {
    nameAndAmountRows.push(
      <tr key={cpData.issureName}>
        <th title={cpData.issureName}>{cpData.issureName}</th>
        {cpData.amounts.map((amount, index) => {
          return <td key={index}>{amount.toLocaleString()}</td>;
        })}
      </tr>,
    );
  });

  // excelDL用メソッド
  const dlExcel = async (e: any) => {
    e.preventDefault();

    // Workbookの作成
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet('発行体別日次残高');
    // ↑で作成したシートを選択
    const worksheet = workbook.getWorksheet('発行体別日次残高');

    // ヘッダ列を作成（日次がヘッダ, 先頭列は発行体名）
    const columns = [{ header: '発行体名', key: 'issureName', width: 60 }];
    dates.forEach((date) =>
      columns.push({ header: format(date), key: format(date), width: 15 }),
    );
    worksheet.columns = columns;

    // 行データを設定（先頭列は発行体名）
    cpDailyAmountDatas.forEach((data) => {
      const row = { issureName: data.issureName };
      data.amounts.forEach((amount, index) => {
        const key = format(dates[index]);
        Object.assign(row, { [key]: amount });
      });
      worksheet.addRow(row);
    });

    // UInt8Arrayを生成
    const uint8Array = await workbook.xlsx.writeBuffer();
    // Blobを生成
    const blob = new Blob([uint8Array], { type: 'application/octet-binary' });
    // DL用URLを生成し、aタグからダウンロードを実行
    const excelDlUrl = window.URL.createObjectURL(blob);
    // aタグを生成
    const a = document.createElement('a');
    // aタグのURLを設定
    a.href = excelDlUrl;
    // aタグにdownload属性を付け、URLがダウンロード対象になるようにします
    a.download =
      'cp_daily_' + format(props.from) + '_' + format(props.to) + '.xlsx';
    // aタグをクリックさせます
    a.click();
    // ダウンロード後は不要なのでaタグを除去
    a.remove();
  };

  return (
    <main className={styles.main}>
      <div>
        <button className={styles.excelButton} onClick={(e) => dlExcel(e)}>
          エクセル DL
        </button>
      </div>
      <div>
        <button className={styles.excelButton} onClick={(e) => dlExcel(e)}>
          エクセル DL
        </button>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>{dateRow}</thead>
          <tbody>{nameAndAmountRows}</tbody>
        </table>
      </div>
    </main>
  );
};
