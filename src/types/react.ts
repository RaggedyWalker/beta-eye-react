import React, { ReactNode } from 'react';

export interface FCProps {
  className?: string;
  classNames?: string[];
  style?: React.CSSProperties;
  children?: ReactNode;
}
export interface FCPropsWithChildren extends FCProps {
  children?: ReactNode;
}
