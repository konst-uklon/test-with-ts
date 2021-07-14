import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/storeTS';
import { resetButton } from './ResetButton.module.scss';
import { deleteData } from '../../store/userItems/actions';

const ResetButton: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button onClick={() => dispatch(deleteData())} className={resetButton}>
      Reset
    </button>
  );
};

export default ResetButton;
