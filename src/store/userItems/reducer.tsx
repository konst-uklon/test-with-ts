import { LOAD_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes';

const LSJson: string | null = localStorage.getItem('user-items');
const localStorageData: string | boolean = LSJson ? JSON.parse(LSJson) : null;

const initialState = {
  data: localStorageData || [],
};

const reducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case LOAD_DATA:
      return { ...state };
    case UPDATE_DATA:
      localStorage.setItem('user-items', JSON.stringify(payload));
      return { ...state, data: payload };
    case DELETE_DATA:
      localStorage.removeItem('user-items');
      return { ...state, data: [] };
    default:
      return state;
  }
};

export default reducer;
