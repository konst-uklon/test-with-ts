import { LOAD_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes';
import { UserItemsArrType } from '../../components/CompareTable/CompareTableTypes';

export const loadData = (data: UserItemsArrType) => ({
  type: LOAD_DATA,
  payload: data,
});

export const updateData = (data: UserItemsArrType) => ({
  type: UPDATE_DATA,
  payload: data,
});

export const deleteData = () => ({
  type: DELETE_DATA,
});
