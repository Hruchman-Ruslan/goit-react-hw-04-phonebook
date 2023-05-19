import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import { object, string } from 'yup';

import { FormikForm, Label, FormikInput, Button, Error } from './Form.styled';

const phoneRegExp =
  /^(?:\+38)?(?:\(0\d{2}\)|0\d{2})[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;

const schema = object().shape({
  name: string()
    .min(5, 'must be at least 3 characters long')
    .max(12, 'must be no more than 12 characters')
    .required('This field is required'),
  number: string()
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .required('A phone number is required'),
});

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const FormContact = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values, id: nanoid() });

    resetForm();
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={INITIAL_STATE}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <Label>
          Name
          <FormikInput type="text" name="name" />
          <Error name="name" component="p" />
        </Label>
        <Label>
          Number
          <FormikInput type="tel" name="number" />
          <Error name="number" component="p" />
        </Label>

        <Button type="submit">Add Contacts</Button>
      </FormikForm>
    </Formik>
  );
};

FormContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
