import { LOAD_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes';

const initialState = {
  data: JSON.parse(localStorage.getItem('user-items')) || [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case UPDATE_DATA:
      localStorage.setItem('user-items', JSON.stringify(action.payload));
      return { ...state, data: action.payload };
    case DELETE_DATA:
      localStorage.removeItem('user-items');
      return { ...state, data: [] };
    default:
      return state;
  }
};

export default reducer;

