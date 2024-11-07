import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Details() {
  //yup is library like formik
  // Define validation schema with Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().min(3 , 'name must be atleast three character').required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be only digits')
      .min(10, 'Phone number must be at least 10 digits')
      .max(10,'Phone number must be only 10 digits')
      .required('Phone Number is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      //oneOf is used for compare password and confirm password
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    address:Yup.string().required('address is required'),
    country: Yup.string().required('Country is required'),
    //initailly it will be false ,then it become true
    terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions')
  });

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="container mt-5 mb-5 w-50 p-5">
        <h1 className="text-center text-success">Registration Form</h1>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: '',
            password: '',
            confirmPassword: '',
            address:'',
            country: '',
            terms: false
          }}
          //here validationSchema is assigned to attribute(formik's attribute)
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Form data', values);
          }}
        >
          {({ handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Field name="fullName" type="text" placeholder="Enter your full name" className="form-control" />
                <ErrorMessage name="fullName" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Field name="email" type="email" placeholder="Enter your email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Field name="phoneNumber" type="text" placeholder="Enter your Phone number" className="form-control" />
                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Field name="dateOfBirth" type="date" className="form-control" />
                <ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
              </Form.Group>

              <Form.Label>Gender</Form.Label>
              <div>
                <Field type="radio" name="gender" value="Male" /> Male
                <Field type="radio" name="gender" value="Female" className="ms-2"/> Female
                <Field type="radio" name="gender" value="Other"  className="ms-2"/> Other
                <ErrorMessage name="gender" component="div" className="text-danger" />
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Field name="password" type="password" placeholder="Enter your password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Field name="confirmPassword" type="password" placeholder="Enter your password again" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>Address</Form.Label>
                <Field name="address" as="textarea" size='lg' rows={3} className="form-control" />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Field as="select" name="country" className="form-select">
                  <option value="">Select Your Country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                </Field>
                <ErrorMessage name="country" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3 mt-2">
                <Form.Label>Profile Picture (optional)</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Field type="checkbox" name="terms" />
                <Form.Label className="ms-2">I accept the terms and conditions</Form.Label>
                <ErrorMessage name="terms" component="div" className="text-danger" />
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button variant="success" size="lg" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Details;
