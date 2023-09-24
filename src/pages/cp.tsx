import dayjs from 'dayjs';
import { useState } from 'react';
import { CpDailyAmountTable } from '../components/CpDailyAmountTable';
import { Header } from '../components/Header';
import DatePicker from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import styles from '../styles/cp.module.scss';
import { Footer } from '../components/Footer';

function formatDate(date: Date): string {
  return dayjs(date).format('YYYY年MM月DD日');
}

export default function Cp() {
  // 3ヶ月前が初期値
  const [from, setFrom] = useState(dayjs().subtract(3, 'month').toDate());
  const [to, setTo] = useState(dayjs().toDate());

  return (
    <>
      <div>
        <Header selected='/cp'></Header>
        <div className={styles.header}>
          <div className={styles.search_window}>
            <div className={styles.search_block}>
              <p>検索開始日</p>
              <DatePicker
                locale={ja}
                selected={from}
                onChange={(date: Date) => setFrom(date)}
                customInput={
                  <button className={styles.button}>{formatDate(from)}</button>
                }
              />
            </div>
            <div className={styles.search_block}>
              <p>検索終了日</p>
              <DatePicker
                locale={ja}
                selected={to}
                onChange={(date: Date) => setTo(date)}
                customInput={
                  <button className={styles.button}>{formatDate(to)}</button>
                }
                minDate={from}
              />
            </div>
          </div>
        </div>
        <CpDailyAmountTable from={from} to={to} />
        <Footer></Footer>
      </div>
    </>
  );
}
