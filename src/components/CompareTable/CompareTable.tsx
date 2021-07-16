import { FunctionComponent, MouseEvent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../store/userItems/selectors';
import { updateData } from '../../store/userItems/actions';
import classes from './CompareTable.module.scss';
import { RenderArrType } from './CompareTableTypes';
import {
  UserItemType,
  UserItemsArrType,
  AppDispatch,
} from '../../appTypes/appTypes';

const CompareTable: FunctionComponent = () => {
  const userItems: UserItemsArrType = useSelector(getData);
  const dispatch = useDispatch<AppDispatch>();
  const {
    tableSection,
    tableHeader,
    tableContainer,
    tableContent,
    tableBody,
    tableRow,
    tableCell,
    tableCellActive,
  } = classes;

  const numOfUserItems: number = userItems.length;
  let renderArr: RenderArrType = [];

  for (let i = 0; i < numOfUserItems; i++) {
    for (let u = i + 1; u < numOfUserItems; u++) {
      const firstItem = userItems[i];
      const secondItem = userItems[u];
      const { value, name } = firstItem;

      renderArr.push({
        firstItemName: name,
        firstItemIsMore: value[u], // we take only the values from the first element, since the second will have the opposite
        secondItemName: secondItem.name,
        id: `${i}, ${u}`, // ID serves to determine, when clicking on the button, which pair we want to compare
      });
    }
  }

  const toggleItem = (e: any) => {
    const {
      target: { id },
    } = e;
    const idArr = id.split(',').map((el: string) => +el); // create an id arr and convert all elements from string to numbers
    const [firstItemIndex, secondItemIndex] = idArr; //we have only 2 parameters, since we set them in the line 46 of this component

    const changeBool = (e: UserItemType, indexOfCompareElem: number) => {
      e.value[indexOfCompareElem] = !e.value[indexOfCompareElem]; // since all values are boolean, we can simply change them to their opposite
      return e;
    };

    const newData: UserItemsArrType = userItems.map(
      (e, index) =>
        index === firstItemIndex // find the first element to compare
          ? changeBool(e, secondItemIndex) // change the value of the first compared element
          : index === secondItemIndex // find the second element to compare
          ? changeBool(e, firstItemIndex) // change the value of the second compared element
          : e // return the unchanged item if it hasn't been compared
    );

    dispatch(updateData(newData));
  };

  return (
    <div className={tableSection}>
      <h3 className={tableHeader}>Compare Items</h3>
      <TableContainer component={Paper} className={tableContainer}>
        <Table className={tableContent}>
          <TableBody className={tableBody}>
            {renderArr.map((item, index) => (
              <TableRow
                key={index}
                className={tableRow}
                onClick={(e: MouseEvent<HTMLElement>) => toggleItem(e)}
              >
                <TableCell
                  id={item.id} // the index of the first and second compared element, given on line 46
                  className={
                    item.firstItemIsMore // sets the class depending on whether the first element is larger than the second
                      ? `${tableCell} ${tableCellActive}`
                      : `${tableCell}`
                  }
                  component='th'
                  scope='row'
                >
                  {item.firstItemName}
                </TableCell>
                <TableCell
                  id={item.id} // the index of the first and second compared element, given on line 46
                  className={
                    !item.firstItemIsMore // inverse relationship with string 90
                      ? `${tableCell} ${tableCellActive}`
                      : `${tableCell}`
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
