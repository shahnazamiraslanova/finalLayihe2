import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Form.css';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
        .matches(/^[0-9+() -]+$/, 'Invalid phone number')
        .required('Required'),
});

const ContactForm = () => {
    
    const handleSubmit = async (values, actions) => {
        try {
            const response = await fetch('http://localhost:8080/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            console.log('Form submitted successfully');
            actions.resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div id="formContact">
            <div className="container">
                <h3>Let’s Start a Conversation</h3>
                <Formik
                    initialValues={{
                        name: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        message: '',
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="name" placeholder="Name" />
                            <ErrorMessage name="name" component="div" />

                            <Field type="text" name="lastName" placeholder="Last Name" />
                            <ErrorMessage name="lastName" component="div" />

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
                            <button type="submit" disabled={isSubmitting} id='contactSubmit'>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ContactForm;
