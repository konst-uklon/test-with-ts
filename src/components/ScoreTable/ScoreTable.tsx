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

  const arrWithScore: UserDataTypeWithScore[] = userItems
    .forEach((e: UserItemType) => ({
      score: e.value.reduce((prev: boolean, cur: boolean) => {
        const num1: any = +(prev as boolean);
        const num2: any = +(cur as boolean);
        return num1 + num2;
      }),
      ...e,
    }))
    .sort((a: UserDataTypeWithScore, b: UserDataTypeWithScore) =>
      // a.score > b.score ? 1 : -1
      {
        const num1: number = a.score;
        const num2: number = b.score;
        if (num1 > num2) {
          return 1;
        }
        if (num1 < num2) {
          return -1;
        }
        return 0;
      }
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
