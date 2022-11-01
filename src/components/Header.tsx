import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/header.module.scss';

interface Props {
  selected: string;
}

interface Page {
  title: string;
  label: string;
}

const pages: Page[] = [
  { title: '/', label: 'topページ' },
  { title: '/cp', label: '日次残高表' },
];

export const Header = (props: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>
          {pages.map((page) => {
            if (page.title === props.selected) {
              return page.label;
            }
          })}
        </title>
      </Head>
      <header className={styles.header}>
        <ul>
          {pages.map((page) => {
            return page.title === props.selected ? (
              <li className={styles.selected}>
                <Link href={page.title}>{page.label}</Link>
              </li>
            ) : (
              <li>
                {' '}
                <Link href={page.title}>{page.label}</Link>
              </li>
            );
          })}
        </ul>
      </header>
    </>
  );
};
