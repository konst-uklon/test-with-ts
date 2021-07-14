import { FunctionComponent } from 'react';
import './CompareTable.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../store/userItems/selectors';
import { updateData } from '../../store/userItems/actions';

type RenderArrType = RenderArrItemType[];
type RenderArrItemType = {
  firstItemName: string;
  firstItemIsMore: boolean;
  secondItemName: string;
  id: number[];
};
type UserItemType = {
  name: string;
  value: (boolean | null)[];
};
type UserItemsArrType = UserItemType[];

const CompareTable: FunctionComponent = () => {
  const userItems: UserItemsArrType | [] = useSelector(getData);
  const dispatch = useDispatch();
  const mainClass: string = 'table';

  const numOfUserItems: number = userItems.length;
  let renderArr: RenderArrType = [];

  for (let i = 0; i < numOfUserItems; i++) {
    for (let u = i + 1; u < numOfUserItems; u++) {
      const firstItem = userItems[i];
      const secondItem = userItems[u];
      const { value, name } = firstItem;

      renderArr.push({
        firstItemName: name,
        firstItemIsMore: value[u],
        secondItemName: secondItem.name,
        id: [i, u],
      });
    }
  }

  const toggleItem = ({ target: { id } }) => {
    const idArr = id.split(',').map((e) => +e); // create an arr and convert all elements to numbers
    const [firstItemIndex, secondItemIndex] = idArr;

    const changeBool = (e: UserItemType, indexOfCompareElem: number) => {
      e.value[indexOfCompareElem] = !e.value[indexOfCompareElem];
      return e;
    };

    const newData = userItems.map(
      (e, index) =>
        index === firstItemIndex // find the first element to compare
          ? changeBool(e, secondItemIndex) // change the value of the first compared element
          : index === secondItemIndex // find the second element to compare
          ? changeBool(e, firstItemIndex) // change the value of the second compared element
          : e // return the unchanged item if it hasn't been compared
    );

    console.log(newData);
    dispatch(updateData(newData));
  };

  return (
    <div className={`${mainClass}__section`}>
      <h3 className={`${mainClass}__header`}>Compare Items</h3>
      <TableContainer component={Paper} className={`${mainClass}__container`}>
        <Table className={`${mainClass}__content`}>
          <TableBody className={`${mainClass}__body`}>
            {renderArr.map((item, index) => (
              <TableRow
                key={index}
                className={`${mainClass}__row`}
                onClick={(e) => toggleItem(e)}
              >
                <TableCell
                  id={item.id.toString()}
                  className={
                    item.firstItemIsMore
                      ? `${mainClass}__cell-active table__cell`
                      : `${mainClass}__cell`
                  }
                  component='th'
                  scope='row'
                >
                  {item.firstItemName}
                </TableCell>
                <TableCell
                  id={item.id.toString()}
                  className={
                    !item.firstItemIsMore
                      ? `${mainClass}__cell-active table__cell`
                      : `${mainClass}__cell`
                  }
                >
                  {item.secondItemName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompareTable;
