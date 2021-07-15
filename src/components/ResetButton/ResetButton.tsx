import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { resetButton } from './ResetButton.module.scss';
import { deleteData } from '../../store/userItems/actions';
import { AppDispatch } from '../../appTypes/appTypes';

const ResetButton: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button onClick={() => dispatch(deleteData())} className={resetButton}>
      Reset
    </button>
  );
};

export default ResetButton;
