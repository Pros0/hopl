import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import withAuth from '../hocs/withAuth';

const User = ({ user, gg }) => {
  const { firstName, lastName, email } = user;
  console.log(user);
  console.log(gg);

  return (
    <Layout>
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
            <form onSubmit={handleSubmit}>
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
                helperText={errors.comment && touched.comment && errors.comment}
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
            </form>
          );
        }}
      </Formik>
    </Layout>
  );
};

// User.getInitialProps = async (ctx) => {
//   // In here we want to make a request to GET /users/id
//   // and pass it down as prop
//
//   return {gg: '23'};
//
// };

export default withAuth({
  WrappedComponent: User,
  redirectTo: '/login',
  shouldBeLoggedIn: true,
});
