import * as fs from 'fs';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import * as path from 'path';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import styles from '../styles/licenses.module.scss';

interface License {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parants: string;
  name: string;
}

interface PageProps {
  licenses: License[];
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const jsonPath = path.join(process.cwd(), 'src', 'licenses.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const licenseMap = new Map<string, License>(
    Object.entries(JSON.parse(jsonText)),
  );

  const licenses: License[] = [];

  licenseMap.forEach((value, key) => {
    value.name = key;
    licenses.push(value);
  });

  return {
    props: { licenses },
  };
};

export default function Licenses(props: PageProps) {
  return (
    <>
      <div>
        <Header selected=''></Header>
        <div className={styles.main}>
          {props.licenses.map((license) => {
            return (
              <div key={license.name}>
                <p className={styles.name}>{license.name}</p>
                <div className={styles.link}>
                  <p>
                    <Link href={license.repository}>{license.repository}</Link>
                  </p>
                  <p>
                    <Link href={license.licenseUrl}>{license.licenseUrl}</Link>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
