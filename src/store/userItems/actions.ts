import { LOAD_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes';

export const loadData = (data: []) => ({
  type: LOAD_DATA,
  payload: data,
});

export const updateData = (data: []) => ({
  type: UPDATE_DATA,
  payload: data,
});

export const deleteData = () => ({
  type: DELETE_DATA,
});
