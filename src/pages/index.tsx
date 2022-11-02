import { Header } from '../components/Header';
import { CpTotalAmountGraph } from '../components/CpTotalAmountGraph';
import styles from '../styles/index.module.scss';

export default function Home() {
  return (
    <>
      <Header selected='/'></Header>
      <div className={styles.totalGraphContainer}>
        <p>日次発行残高(百万)</p>
        <CpTotalAmountGraph></CpTotalAmountGraph>
      </div>
    </>
  );
}
