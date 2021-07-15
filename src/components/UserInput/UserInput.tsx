import React from 'react';
import './UserInput.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../store/userItems/selectors';
import { updateData } from '../../store/userItems/actions';
import {
  UserItemType,
  UserItemsArrType,
  AppDispatch,
} from '../../appTypes/appTypes';

type ValuesArrTypes = (boolean | null)[];

const UserInput = () => {
  const data: UserItemsArrType = useSelector(getData);
  const dispatch = useDispatch<AppDispatch>();

  // add custom validation method
  yup.addMethod<yup.StringSchema>(
    yup.string,
    'uniqueName',
    function isUniqueName(message: string) {
      return this.test(`test-unique-name`, message, function (value) {
        const { path, createError } = this;

        if (data.length > 0 && value !== undefined) {
          const names: string[] = data.map((e) => e.name.toLowerCase());
          const isUnique: boolean = !names.includes(value.toLowerCase());
          return isUnique;
        }

        return createError({ path, message: message });
      });
    }
  );

  const validationSchema = yup.object().shape({
    item: yup
      .string()
      .required('Required')
      .uniqueName('This item already exists'),
  });

  const addNewItem = (
    value: { item: string },
    actions: { resetForm: () => void }
  ) => {
    const dataLength: number = data.length;
    const newItemValue: ValuesArrTypes = [];

    for (let i = 0; i <= dataLength; i++) {
      switch (i) {
        case dataLength:
          newItemValue.push(null);
          break;
        default:
          newItemValue.push(false);
          break;
      }
    }

    const newItem: UserItemType = { name: value.item, value: newItemValue };

    if (dataLength > 0) {
      data.forEach((e) => e.value.push(true));
    }

    const newData: UserItemsArrType = [...data, newItem];

    dispatch(updateData(newData));
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
          <Form className='user__form'>
            <Field
              type='text'
              name='item'
              placeholder={data.length ? 'New item' : 'Add your first item'}
              className='user__unput'
            />
            <Field
              type='submit'
              name='submit'
              disabled={isSubmitting}
              className='user__submit'
              value='Add'
            />
          </Form>
          {errors ? <p className='user__error'>{errors.item}</p> : null}
        </>
      )}
    </Formik>
  );
};

export default UserInput;
