import { useImmutable } from '../swrs/useSwr';
import {
  CpTotalAmountResponse,
  CpTotalAmountData,
} from '../interface/CpTotalAmountResponse';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import styles from '../styles/cp-total-amount-graph.module.scss';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const graphData = {
  // x 軸のラベル
  labels: ['1'],
  datasets: [
    {
      label: '発行残高(百万)',
      // データの値
      data: [1],
      backgroundColor: ['#4444FF'],
    },
  ],
};

const options = {
  // アスペクト比
  maintainAspectRatio: true,
  tooltip: {
    titleFont: { size: 17 },
    bodyFont: { size: 17 },
    titleMarginBottom: 15,
    backgroundColor: 'rgba(255,112,162,0.8)',
    titleColor: 'rgba(0,0,0,1)',
    bodyColor: 'rgba(0,0,0,1)',
    displayColors: true,
    xAlign: 'center',
  },
};

const apiPath: string = '/api/cp/amount/total';
const from: Date = dayjs().subtract(6, 'month').toDate();
const to: Date = dayjs().toDate();

function createUrl(from: string, to: string): string {
  return apiPath + '?from=' + from + '&to=' + to;
}

function format(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export const CpTotalAmountGraph = (): JSX.Element => {
  const url: string = createUrl(format(from), format(to));
  const { data, isLoading } = useImmutable(url);
  if (isLoading) return <div className={styles.loading}></div>;
  if (data.status !== undefined) {
    return (
      <div>
        <p className={styles.error}>エラーが発生しました。</p>
      </div>
    );
  }

  const cpTotalAmountDatas: CpTotalAmountData[] = (
    data as CpTotalAmountResponse
  ).cpTotalAmountDatas;

  const labels: string[] = [];
  const graphDates: number[] = [];
  cpTotalAmountDatas.map((cpTotalAmountData) => {
    labels.push(format(cpTotalAmountData.date));
    graphDates.push(cpTotalAmountData.amount);
  });

  graphData.labels = labels;
  graphData.datasets[0].data = graphDates;

  return <Bar data={graphData} options={options} />;
};
