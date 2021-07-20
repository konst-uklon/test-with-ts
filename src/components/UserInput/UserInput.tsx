import { FunctionComponent } from 'react';
import {
  userForm,
  userInput,
  userSubmit,
  userError,
} from './UserInput.module.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../store/userItems/selectors';
import { updateData } from '../../store/userItems/actions';
import {
  UserItemType,
  UserItemsArrType,
  ValuesType,
  AppDispatch,
} from '../../appTypes/appTypes';

const UserInput: FunctionComponent = () => {
  const data: UserItemsArrType = useSelector(getData);
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = yup.object().shape({
    item: yup
      .string()
      .required('Required')
      .test('is-unique', `Item is already exists`, (value) => {
        if (data.length > 0 && value !== undefined) {
          return !data
            .map((e) => e.name.toLowerCase()) // getting an array of already existing elements, converting to one type for comparison
            .includes(value.toLowerCase()); // checking for the presence of the entered value in the existing ones
        }
        return true;
      }),
  });

  const addNewItem = (
    value: { item: string },
    actions: { resetForm: () => void }
  ) => {
    // get length of user data
    const dataLength: number = data.length;

    // array for new item, will fill with the relation of the new item to the existing ones
    const newItemValuesArr: ValuesType[] = [
      ...Array(dataLength).fill(false),
      null,
    ];

    // crete new item
    const newItem: UserItemType = { name: value.item, value: newItemValuesArr };

    // if there are already existing items, the new-to-old relationship is added to them by default "new less than old"
    if (dataLength > 0) {
      data.forEach((e) => (e.value = [...e.value, true]));
    }

    // new data for app with new item
    const newData: UserItemsArrType = [...data, newItem];

    dispatch(updateData(newData)); // set new arr to store
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ item: '' }}
      validationSchema={validationSchema}
      onSubmit={(value: { item: string }, actions) =>
        addNewItem(value, actions)
      }
    >
      {({ errors, isSubmitting }) => (
        <>
          <Form className={userForm}>
            <Field
              type='text'
              name='item'
              placeholder={data.length ? 'New item' : 'Add your first item'}
              className={userInput}
            />
            <Field
              type='submit'
              name='submit'
              disabled={isSubmitting}
              className={userSubmit}
              value='Add'
            />
          </Form>
          {errors ? <p className={userError}>{errors.item}</p> : null}
        </>
      )}
    </Formik>
  );
};

export default UserInput;
