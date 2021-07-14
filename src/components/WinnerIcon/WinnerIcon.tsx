import { FunctionComponent } from 'react';
import { winnerIcon } from './WinnerIcon.module.scss';

const WinnerIcon: FunctionComponent = () => (
  <span className={winnerIcon}> Winner </span>
);
export default WinnerIcon;
