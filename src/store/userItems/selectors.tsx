import { UserItemType } from '../../appTypes/appTypes';

interface DataType {
  data: UserItemType[];
}
interface StateDataType {
  userItems: DataType;
}

export const getData = (state: StateDataType) => state.userItems.data;
