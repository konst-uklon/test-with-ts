import { FunctionComponent } from 'react';
import './App.scss';
import CompareTable from './components/CompareTable/CompareTable';
import ScoreTable from './components/ScoreTable/ScoreTable';
import UserInput from './components/UserInput/UserInput';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from './store/userItems/selectors';
import { loadData } from './store/userItems/actions';
import { useEffect } from 'react';
import ResetButton from './components/ResetButton/ResetButton';
import { AppDispatch } from './appTypes/appTypes';

const App: FunctionComponent = () => {
  const isUserItems = useSelector(getData).length; // determine if there are already existing items to render to the page
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <>
      {isUserItems ? <ResetButton /> : null}
      <div className='app__container'>
        <div className='app__entry-field'>
          <UserInput />
          {isUserItems ? <ScoreTable /> : null}
        </div>
        {isUserItems >= 2 ? <CompareTable /> : null}
      </div>
    </>
  );
};

export default App;
