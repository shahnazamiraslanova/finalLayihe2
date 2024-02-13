import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Form.css';

const ValidationSchema = Yup.object().shape({
    requested: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
        .matches(/^[0-9+() -]+$/, 'Invalid phone number')
        .required('Required'),
});

const ContactForm = () => {
    
    return (
        <div id="formContact">
            <div className="container">
                <h3>Let’s Start a Conversation</h3>
                <Formik
                    initialValues={{
                        requested: '',
                        surname: '',
                        email: '',
                        phone: '',
                        message: '',
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, actions) => {
                        // Handle form submission here
                        console.log(values);
                        actions.setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="requested" placeholder="Name" />
                            <ErrorMessage name="requested" component="div" />

                            <Field type="text" name="surname" placeholder="Last Name" />
                            <ErrorMessage name="surname" component="div" />

                            <Field type="text" name="email" placeholder="Your Email" />
                            <ErrorMessage name="email" component="div" />

                            <Field type="text" name="phone" placeholder="Your Phone" />
                            <ErrorMessage name="phone" component="div" />

                            <Field
                                as="textarea"
                                name="message"
                                placeholder="Your Message"
                                rows={10}
                                cols={30}
                            />
                            <button type="submit"  id='contactSubmit' >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ContactForm;
