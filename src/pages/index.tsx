import { Header } from '../components/Header';
import { CpTotalAmountGraph } from '../components/CpTotalAmountGraph';
import styles from '../styles/index.module.scss';
import { Footer } from '../components/Footer';

export default function Index() {
  return (
    <>
      <div className={styles.wrapper}>
        <Header selected='/'></Header>
        <div className={styles.totalGraphContainer}>
          <p>日次発行残高(百万)</p>
          <CpTotalAmountGraph></CpTotalAmountGraph>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
