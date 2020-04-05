/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Alert from '../Alert';
import Layout from '../Layout';
import saveUserDetails from '../../requests/saveUserDetails';
import { UserForm, Card, PageWrapper, ButtonsWrapper } from './styles';
import messages from './messages';

const Form = ({ user }) => {
  const [isSubmittingUserDetails, setIsSubmittingUserDetails] = useState(false);
  const [saveUserDetailsResponse, setSaveUserDetailsResponse] = useState(null);
  const { formatMessage } = useIntl();

  return (
    <Layout>
      <PageWrapper>
        <Formik
          initialValues={{
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone || '',
            city: user.city || '',
            driversLicense: user.driversLicense || '',
            covidStatus: user.covidStatus || '',
          }}
          onSubmit={(values, actions) => {
            if (isSubmittingUserDetails) return;
            setIsSubmittingUserDetails(true);
            saveUserDetails({
              body: { id: user.id, ...values },
              onComplete: () => {
                setSaveUserDetailsResponse({});
                actions.setSubmitting(false);
              },
              onError: setSaveUserDetailsResponse,
              onFinally: () => setIsSubmittingUserDetails(false),
            });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required('Required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            phone: Yup.string(),
            city: Yup.string(),
            driversLicense: Yup.string(),
            covidStatus: Yup.string(),
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
                <Typography component="h2" variant="h5">
                  {formatMessage(messages.mainTitle)}
                </Typography>
                <UserForm onSubmit={handleSubmit}>
                  <TextField
                    error={errors.email && touched.email}
                    label={formatMessage(messages.emailInputPlaceholder)}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                    margin="normal"
                    disabled
                  />

                  <TextField
                    label={formatMessage(messages.firstNameInputPlaceholder)}
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
                    label={formatMessage(messages.lastNameInputPlaceholder)}
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
                    label={formatMessage(messages.phoneInputPlaceholder)}
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.phone && touched.phone && errors.phone}
                    margin="normal"
                  />

                  <TextField
                    label={formatMessage(messages.cityInputPlaceholder)}
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.city && touched.city && errors.city}
                    margin="normal"
                  />

                  <TextField
                    label={formatMessage(
                      messages.driversLicenseInputPlaceholder,
                    )}
                    name="driversLicense"
                    value={values.driversLicense}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.driversLicense &&
                      touched.driversLicense &&
                      errors.driversLicense
                    }
                    margin="normal"
                  />

                  <TextField
                    label={formatMessage(messages.covidStatusInputPlaceholder)}
                    name="covidStatus"
                    value={values.covidStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.covidStatus &&
                      touched.covidStatus &&
                      errors.covidStatus
                    }
                    margin="normal"
                  />

                  <ButtonsWrapper>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      type="button"
                      className="outline"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      {formatMessage(messages.resetButtonText)}
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {formatMessage(messages.saveButtonText)}
                    </Button>
                  </ButtonsWrapper>
                </UserForm>

                {saveUserDetailsResponse && (
                  <Alert
                    severity={
                      saveUserDetailsResponse.error ? 'error' : 'success'
                    }
                  >
                    {saveUserDetailsResponse.error
                      ? saveUserDetailsResponse.error.message
                      : `User details saved successfully!`}
                  </Alert>
                )}
              </Card>
            );
          }}
        </Formik>
      </PageWrapper>
    </Layout>
  );
};

export default Form;
