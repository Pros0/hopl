/* eslint-disable react/prop-types */
import React from 'react';
import { useIntl } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../Layout';
import { Title, Subtitle } from '../common/Form/styles';
import { UserForm, Card } from './styles';

const Form = ({ user }) => {
  const { formatMessage } = useIntl();
  const { firstName, lastName, email } = user;

  return (
    <Layout>
      <Title>Details</Title>
      <Formik
        initialValues={{
          firstName,
          lastName,
          email,
          comment: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Required'),
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          comment: Yup.string().required('Required'),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <Card>
              <UserForm onSubmit={handleSubmit}>
                <TextField
                  label="Firstname"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.firstName && touched.firstName && errors.firstName
                  }
                  margin="normal"
                />

                <TextField
                  label="Lastname"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.lastName && touched.lastName && errors.lastName
                  }
                  margin="normal"
                />

                <TextField
                  error={errors.email && touched.email}
                  label="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                  margin="normal"
                />

                <TextField
                  label="comment"
                  name="comment"
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.comment && touched.comment && errors.comment
                  }
                  margin="normal"
                />
                <Button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </UserForm>
            </Card>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default Form;
