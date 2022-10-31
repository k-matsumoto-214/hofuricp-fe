import { useImmutable } from '../swrs/useSwr';
import dayjs from 'dayjs';
import {
  CpDailyAmountResponse,
  CpDailyAmountData,
} from '../interface/CpDailyAmountResponse';

interface Props {
  from: Date;
  to: Date;
}

const apiPath: string = '/api/cp/amount';

function createUrl(from: string, to: string): string {
  return apiPath + '?from=' + from + '&to=' + to;
}

function format(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export const CpDailyAmountTable = (props: Props) => {
  const url: string = createUrl(format(props.from), format(props.to));
  const { data, isLoading, isError } = useImmutable(url);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  const cpDailyAmountDatas = (data as CpDailyAmountResponse).cpDailyAmountDatas;

  const dateRow: JSX.Element = (
    <tr>
      <td></td>
      {cpDailyAmountDatas.map((cpDailyAmountData) => {
        return (
          <td key={format(cpDailyAmountData.date)}>
            {format(cpDailyAmountData.date)}
          </td>
        );
      })}
    </tr>
  );

  const issuerNumber: number = cpDailyAmountDatas[0].cpAmountData.length;
  const dateNumber: number = cpDailyAmountDatas.length;
  const nameAndAmountRows: JSX.Element[] = [];

  for (let i: number = 0; i < issuerNumber; i++) {
    const name: string = cpDailyAmountDatas[0].cpAmountData[i].name;
    const amounts: number[] = [];
    for (let j: number = 0; j < dateNumber; j++) {
      const cpDailyAmountData: CpDailyAmountData = cpDailyAmountDatas[j];
      amounts.push(cpDailyAmountData.cpAmountData[i].amount);
    }

    nameAndAmountRows.push(
      <tr key={i}>
        <td>{name}</td>
        {amounts.map((amount, index) => {
          return <td key={index}>{amount}</td>;
        })}
      </tr>,
    );
  }

  return (
    <div>
      <table>
        <thead>{dateRow}</thead>
        <tbody>{nameAndAmountRows}</tbody>
      </table>
    </div>
  );
};
