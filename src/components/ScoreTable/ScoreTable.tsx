import { FunctionComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import WinnerIcon from '../WinnerIcon/WinnerIcon';
import { getData } from '../../store/userItems/selectors';
import { UserItemType, UserItemsArrType } from '../../appTypes/appTypes';
import { UserDataTypeWithScore } from './ScoreTableTypes';
import { useStyles } from './ScoreTableStyles';

const ScoreTableTS: FunctionComponent = () => {
  const classes = useStyles();
  const { container, theadCell, trowItem } = classes;
  const userItems: UserItemsArrType = useSelector(getData);

  const sumOfScores = (arr: (boolean | null)[]) => {
    let sum: number = 0;
    arr.forEach((el) => (el ? (sum += 1) : null));
    return sum;
  };

  const arrWithScore: UserDataTypeWithScore[] = userItems
    .map((e: UserItemType) => ({ score: sumOfScores(e.value), ...e }))
    .sort((a: UserDataTypeWithScore, b: UserDataTypeWithScore): number =>
      a.score > b.score ? 1 : -1
    );

  const [firstItem] = arrWithScore;
  const highestValue: number = firstItem.score;

  return (
    <TableContainer component={Paper} className={container}>
      <Table size='small' aria-label='a danse table'>
        <TableHead>
          <TableRow>
            <TableCell className={theadCell}>Item</TableCell>
            <TableCell className={theadCell} align='center'>
              Score
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrWithScore.map((item: UserDataTypeWithScore, index: number) => (
            <TableRow key={index}>
              <TableCell className={trowItem} component='th' scope='row'>
                {item.name}
              </TableCell>
              <TableCell align='center'>{item.score}</TableCell>
              <TableCell align='center'>
                {item.score === highestValue ? <WinnerIcon /> : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTableTS;
