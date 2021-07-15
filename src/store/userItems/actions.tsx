import { LOAD_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes';
import { UserItemsArrType } from '../../appTypes/appTypes';

export const loadData = () => ({
  type: LOAD_DATA,
});

export const updateData = (data: UserItemsArrType) => ({
  type: UPDATE_DATA,
  payload: data,
});

export const deleteData = () => ({
  type: DELETE_DATA,
});
