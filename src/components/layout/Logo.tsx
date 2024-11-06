import { useNavigate } from 'react-router-dom';
import theme from '@/themes/theme';
import { FCProps } from '@/types/react';
import { motion } from 'framer-motion';

interface customProps extends FCProps {
  theme?: 'dark' | 'light';
  collapsed: boolean;
  redirect?: string;
  size?: number | string;
}
export default function Logo(props: customProps) {
  const navigator = useNavigate();
  const mainColor = props.theme === 'dark' ? '#f7f7f7' : theme.colors.primary;
  const fillColor = props.theme === 'dark' ? 'black' : 'white';
  const { size = 64 } = props;
  return (
    <motion.div
      layout
      className={`${props.className} flex items-center justify-center overflow-hidden`}
    >
      <motion.span layout>
        <svg
          onClick={() => navigator(props.redirect || '/')}
          className="scale-125 cursor-pointer transition duration-500 hover:scale-150 hover:stroke-primary"
          width={size}
          viewBox="0 0 480 480"
          stroke={mainColor}
          fill={fillColor}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <desc>Created with Pixso.</desc>
          <g>
            <line
              id="直线 1"
              x1="190.000000"
              y1="126.000000"
              x2="190.000000"
              y2="215.234283"
              stroke="current"
              strokeOpacity="1.000000"
              strokeWidth="14.000000"
            />
            <circle
              id="椭圆 1"
              cx="240.000000"
              cy="263.000000"
              r="75.000000"
              fill="#C4C4C4"
              fillOpacity="0"
            />
            <circle
              id="椭圆 1"
              cx="240.000000"
              cy="263.000000"
              r="69.000000"
              stroke="current"
              strokeOpacity="1.000000"
              strokeWidth="14.000000"
            />
            <circle
              id="椭圆 2"
              cx="240.500000"
              cy="262.500000"
              r="47.500000"
              fill="#C4C4C4"
              fillOpacity="0"
            />
            <circle
              id="椭圆 2"
              cx="240.500000"
              cy="262.500000"
              r="41.500000"
              stroke="current"
              strokeOpacity="1.000000"
              strokeWidth="14.000000"
            />
            <line
              id="直线 2"
              x1="190.000000"
              y1="310.000000"
              x2="190.000000"
              y2="354.617126"
              stroke="current"
              strokeOpacity="1.000000"
              strokeWidth="14.000000"
            />
          </g>
        </svg>
      </motion.span>
      {!props.collapsed && (
        <motion.span
          layout
          className={`-ml-2 hidden cursor-default text-xl font-semibold text-primary/95 lg:${props.collapsed ? 'hidden' : 'block'} -translate-x-1 translate-y-1`}
        >
          eta Eye
        </motion.span>
      )}
    </motion.div>
  );
}
