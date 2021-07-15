type ValuesType = (boolean | null)[];
type ItemType = {
  name: string;
  value: ValuesType;
};
type DataType = { data: ItemType[] };
type UserItemType = { userItems: DataType };

export const getData = (state: UserItemType) => state.userItems.data;
