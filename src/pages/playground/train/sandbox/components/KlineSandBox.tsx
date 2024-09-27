import { FCProps } from '@/types/react';
import { SymbolDayLine } from '@/types/service';
import { Transaction } from '../page';

interface CustomProps extends FCProps {
  trainData: SymbolDayLine[];
  transactionRecord: Transaction[];
}

function KlineSandBox(props: CustomProps) {
  return <div className={`${props.className || ''}`}></div>;
}

export default KlineSandBox;
