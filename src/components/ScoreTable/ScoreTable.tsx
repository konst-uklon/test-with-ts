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
import {
  UserItemType,
  UserItemsArrType,
  ValuesType,
} from '../../appTypes/appTypes';
import { useStyles } from './ScoreTableStyles';

const ScoreTableTS: FunctionComponent = () => {
  const classes = useStyles();
  const { container, theadCell, trowItem } = classes;
  const userItems: UserItemsArrType = useSelector(getData);

  const sumOfScores = (arr: ValuesType[]) => {
    // the value is an array of true and false. If the index of the element itself coincides with the indix of the array of the value of the element itself, then null
    let sum: number = 0; //  an array of values is something like [ true(if element more than UserItemsArr[0]), false(if less than UserItemsArr[1]), null(if the item has the same index as the value[index]) ] = [true, false, null], sum of scores for this elem is 1, because he more than one element in UserItemsArr
    arr.forEach((el) => (el ? (sum += 1) : null)); // if compare value true - sum += 1
    return sum;
  };

  const arrWithScore: UserItemType[] = userItems
    .map((e: UserItemType) => ({
      score: sumOfScores(e.value), // add the property value to the original object
      ...e,
    }))
    .sort(
      (a: UserItemType, b: UserItemType): number =>
        a.score !== undefined && b.score !== undefined ? b.score - a.score : 0 // sorting an array by score
    );

  const [firstItem] = arrWithScore; // looking for the first element of the sorted array from largest to smallest
  const highestValue: number | undefined = firstItem.score;

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
          {arrWithScore.map((item: UserItemType, index: number) => (
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
