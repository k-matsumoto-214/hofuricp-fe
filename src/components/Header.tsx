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
  const targetPage: Page | undefined = pages.find(
    (page) => page.title === props.selected,
  );
  return (
    <>
      <Head>
        <title>CP残高情報あつめました</title>
        <meta
          name='description'
          content='証券保管振替機構から日次発表されるCP発行残高を集計しているサイトです。日次の発行体別残高、全体の残高など確認できます。'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
      </Head>
      <header className={styles.header}>
        <ul>
          {pages.map((page) => {
            return page.title === props.selected ? (
              <li className={styles.selected} key={page.title}>
                <Link href={page.title}>{page.label}</Link>
              </li>
            ) : (
              <li key={page.title}>
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
