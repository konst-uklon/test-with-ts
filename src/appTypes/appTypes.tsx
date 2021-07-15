import store from '../store/store';

export type UserItemType = {
  name: string;
  value: (boolean | null)[];
};

export type UserItemsArrType = UserItemType[];

export type AppDispatch = typeof store.dispatch;
