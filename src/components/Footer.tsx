import Link from 'next/link';
import styles from '../styles/footer.module.scss';

export const Footer = (): JSX.Element => {
  return (
    <>
      <footer className={styles.footer}>
        <ul>
          <li>
            <Link href='/cp'>cp</Link>
          </li>
        </ul>
      </footer>
    </>
  );
};
