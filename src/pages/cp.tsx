import dayjs from 'dayjs';
import { CpDailyAmountTable } from '../components/CpDailyAmountTable';

export default function Cp() {
  return (
    <>
      <CpDailyAmountTable
        from={dayjs().subtract(3, 'month').toDate()}
        to={dayjs().toDate()}
      />
    </>
  );
}
