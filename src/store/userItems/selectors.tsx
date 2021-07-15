type ValuesType = (boolean | null)[];
type ItemType = {
  name: string;
  value: ValuesType;
};
type DataType = [ItemType];
// type UserItemType = {
//   data: DataType;
// };

export const getData = (state: any) => state.userItems.data;

// https://stackoverflow.com/questions/42283729/how-to-use-selectors-in-redux-app-with-typescript
