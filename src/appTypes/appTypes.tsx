import store from '../store/store';

// types
export type ValuesType = boolean | null;
export type UserItemsArrType = UserItemType[];
export type AppDispatch = typeof store.dispatch;

// interfaces
export interface UserItemType {
  name: string;
  value: ValuesType[];
  score?: number;
}
