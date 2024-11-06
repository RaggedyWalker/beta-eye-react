import { Suspense } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FCProps } from '@/types/react';

interface CustomProps extends FCProps {
  fallback?: JSX.Element;
}
function SuspensePage(props: CustomProps) {
  return (
    <Suspense fallback={props.fallback || <AiOutlineLoading3Quarters />}>
      {props.children}
    </Suspense>
  );
}

export default SuspensePage;
